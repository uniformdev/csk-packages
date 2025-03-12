// app/api/translation/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { CanvasClient, ContentClient } from '@uniformdev/canvas';
import { mergeTranslationToUniform, TranslationPayload } from '@uniformdev/tms-sdk';

type TranslationRequestPayload = {
  translationPayload: TranslationPayload;
};

const workflowId = process.env.WORKFLOW_ID ? process.env.WORKFLOW_ID : undefined;
const workflowTranslatedStageId = process.env.WORKFLOW_TRANSLATED_STAGE_ID
  ? process.env.WORKFLOW_TRANSLATED_STAGE_ID
  : undefined;

export async function POST(request: NextRequest) {
  console.info('translation-callback');
  const payload = (await request.json()) as TranslationRequestPayload;
  const translationPayload = payload.translationPayload;

  if (!translationPayload) {
    console.info('no translation payload');
    return NextResponse.json({ updated: false }, { status: 500 });
  }

  const uniformProjectId = translationPayload.metadata.uniformProjectId;
  const uniformReleaseId = translationPayload.metadata.uniformReleaseId;
  const uniformEntityType = translationPayload.metadata.entityType;
  const uniformEntityId = translationPayload.metadata.entity.id;

  console.info(
    `process translation payload (project: ${uniformProjectId}, release: ${
      uniformReleaseId || 'n/a'
    }, entityType: ${uniformEntityType}, entity: ${uniformEntityId})`
  );

  const canvasClient = new CanvasClient({
    projectId: uniformProjectId,
    apiKey: process.env.UNIFORM_API_KEY || assert('missing UNIFORM_API_KEY'),
    bypassCache: true,
    apiHost: process.env.UNIFORM_CLI_BASE_URL,
  });

  const contentClient = new ContentClient({
    projectId: uniformProjectId,
    apiKey: process.env.UNIFORM_API_KEY || assert('missing UNIFORM_API_KEY'),
    bypassCache: true,
    apiHost: process.env.UNIFORM_CLI_BASE_URL,
  });

  const { translationMerged } = await mergeTranslationToUniform({
    canvasClient,
    contentClient,
    translationPayload,
    updateComposition: async ({ canvasClient, composition }) => {
      console.info('update composition: start');
      const compositionWithWorkflow = ensureWorkflowStage(composition);
      await canvasClient.updateComposition(compositionWithWorkflow);
      console.info('update composition: done');
      return true;
    },
    updateEntry: async ({ contentClient, entry }) => {
      console.info('update entry: start');
      const entryWithWorkflow = ensureWorkflowStage(entry);
      await contentClient.upsertEntry(entryWithWorkflow);
      console.info('update entry: done');
      return true;
    },
    onNotFound: ({ translationPayload }) => {
      const entityType = translationPayload.metadata.entityType;
      const entityId = translationPayload.metadata.entity.id;
      console.info(`skip: can not find ${entityType} (${entityId})`);
    },
    onNotTranslatedResult: ({ updated, errorKind, errorText }) => {
      if (errorKind !== undefined) {
        console.warn(errorText || 'Unknown error');
      } else if (!updated) {
        console.info('Translation has no updates');
      }
    },
  });

  return NextResponse.json({ updated: translationMerged });
}

const ensureWorkflowStage = <T extends { workflowId?: string; workflowStageId?: string }>(entity: T): T => {
  if (workflowId && workflowTranslatedStageId && entity.workflowId === workflowId) {
    return {
      ...entity,
      workflowStageId: workflowTranslatedStageId,
    };
  }
  return entity;
};

function assert(msg: string): never {
  throw new Error(msg);
}

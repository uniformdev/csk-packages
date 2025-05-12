import { CANVAS_PUBLISHED_STATE } from '@uniformdev/canvas';
import { getCanvasClient } from '@uniformdev/canvas-next-rsc';
import getOpenAIDescription from '@/utils/workflow-approval/getOpenAIDescription';
import sendSlackNotification from '@/utils/workflow-approval/sendSlackNotification';
import takeScreenshots from '@/utils/workflow-approval/takeScreenshots';
import { put } from '@vercel/blob';

const VERCEL_FOLDER = 'workflow-approval';

export async function POST(request: Request) {
  try {
    console.info('Workflow approval process started');
    const { entity, initiator, newStage, previousStage, timestamp } = await request.json();

    if (entity.type !== 'component') {
      console.info(`Skipping non-component entity type: ${entity.type}`);
      return Response.json({ success: true });
    }

    console.info(`Processing composition: ${entity.id}`);
    const compositionId = entity.id;
    const canvasClient = getCanvasClient({
      cache: {
        type: 'revalidate',
        interval: 0,
      },
    });
    const history = await canvasClient.getCompositionHistory({ compositionId });

    if (!history) {
      console.info('No history found for composition');
      return Response.json({ success: false, error: 'No history found for composition' });
    }

    const latestVersion = history?.results?.[0];
    const latestPublishedVersion = history?.results?.find(result => result.state === CANVAS_PUBLISHED_STATE);

    if (!latestPublishedVersion || !latestVersion) {
      console.info('No published version found for comparison');
      return Response.json({ success: false, error: 'No published version found for comparison' });
    }

    const host = process.env.NEXT_PUBLIC_VERCEL_URL
      ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
      : 'http://localhost:3000';

    const latestVersionPreviewUrl = `${host}/composition-version-preview/${compositionId}?versionId=${latestVersion?.versionId}&isDraft=${latestVersion?.state === CANVAS_PUBLISHED_STATE}&secret=${process.env.UNIFORM_PREVIEW_SECRET}`;
    const latestPublishedVersionPreviewUrl = `${host}/composition-version-preview/${compositionId}?versionId=${latestPublishedVersion.versionId}&isDraft=${latestPublishedVersion.state === CANVAS_PUBLISHED_STATE}&secret=${process.env.UNIFORM_PREVIEW_SECRET}`;

    console.info('Taking screenshots...');
    const { latestVersionScreenshot, latestPublishedVersionScreenshot } = await takeScreenshots(
      latestVersionPreviewUrl,
      latestPublishedVersionPreviewUrl
    );
    console.info('Screenshots taken successfully');

    console.info('Uploading screenshots to Vercel Blob...');
    const [uploadedLatestVersionScreenshot, uploadedLatestPublishedVersionScreenshot] = await Promise.all([
      put(`${VERCEL_FOLDER}/latest-version-${compositionId}.png`, Buffer.from(latestVersionScreenshot), {
        access: 'public',
        addRandomSuffix: true,
      }),
      put(
        `${VERCEL_FOLDER}/latest-published-version-${compositionId}.png`,
        Buffer.from(latestPublishedVersionScreenshot),
        {
          access: 'public',
          addRandomSuffix: true,
        }
      ),
    ]);
    console.info('Screenshots uploaded successfully');

    console.info('Fetching composition versions...');
    const changesDescription = await getOpenAIDescription({
      compositionId,
      latestVersionId: latestVersion?.versionId,
      latestPublishedVersionId: latestPublishedVersion?.versionId,
    });

    const latestVersionScreenshotUrl = uploadedLatestVersionScreenshot.url;
    const latestPublishedVersionScreenshotUrl = uploadedLatestPublishedVersionScreenshot.url;
    const diffUrl = `${host}/composition-version-preview/${compositionId}/diff?draftVersionId=${latestVersion.versionId}&publishedVersionId=${latestPublishedVersion.versionId}&latestVersionScreenshotUrl=${latestVersionScreenshotUrl}&latestPublishedVersionScreenshotUrl=${latestPublishedVersionScreenshotUrl}&secret=${process.env.UNIFORM_PREVIEW_SECRET}`;

    console.info('Sending Slack notification...');
    await sendSlackNotification({
      entityType: 'composition',
      entity,
      initiator,
      newStage,
      previousStage,
      timestamp,
      latestVersionScreenshotUrl,
      latestPublishedVersionScreenshotUrl,
      latestVersionPreviewUrl,
      latestPublishedVersionPreviewUrl,
      diffUrl,
      changesDescription,
    });

    console.info('Workflow approval process completed successfully');
    return Response.json({ success: true });
  } catch (error) {
    console.error('Error in workflow-approval process:', error);
    return Response.json({ success: false, error: error instanceof Error ? error.message : 'Unknown error' });
  }
}

import { NextRequest, NextResponse } from 'next/server';
import { CANVAS_PUBLISHED_STATE } from '@uniformdev/canvas';
import locales from '@/i18n/locales.json';
import { ENTRY_TYPES_TO_SYNC } from '@/modules/chat/constants';
import { createOrUpdateResource, deleteResource } from '@/modules/chat/rag/actions/resources';
import { transformEntryToResource } from '@/modules/chat/utils';
import { contentClient } from '@/modules/chat/utils/uniformClients';

const syncEntryWithDatabase = async (entryId: string): Promise<{ message: string }> => {
  const { entries } = await contentClient
    .getEntries({
      entryIDs: [entryId],
      diagnostics: false,
      locale: locales.defaultLocale,
      state: CANVAS_PUBLISHED_STATE,
    })
    .catch(e => {
      if (e.statusCode !== 404) throw e;
      return { entries: [] };
    });

  const deleteAndRespond = async () => {
    await deleteResource(entryId);
    return { message: `Resource ${entryId} and its embeddings were successfully deleted from database.` };
  };

  if (entries.length === 0) {
    return deleteAndRespond();
  }

  const resource = transformEntryToResource(entries[0]);
  if (resource.textContent.length) {
    await createOrUpdateResource(resource);
    return { message: `Resource ${entryId} and its embeddings were successfully created/updated in database.` };
  }

  return deleteAndRespond();
};

export async function POST(req: NextRequest) {
  try {
    const payload = await req.json();
    const rawType = typeof payload?.type === 'string' ? payload.type : 'unknown';
    const entryId = typeof payload?.id === 'string' ? payload.id : 'none';

    console.info(`[webhook][entry-change] Incoming event: type=${rawType}, entryId=${entryId}`);

    if (ENTRY_TYPES_TO_SYNC.includes(rawType)) {
      const result = await syncEntryWithDatabase(entryId);
      console.info(`[webhook][entry-change] Sync completed for ${rawType} (${entryId}): ${result.message}`);
      return NextResponse.json(result, { status: 200 });
    }

    console.warn(`[webhook][entry-change] No handler for entry type="${rawType}"`);
    return NextResponse.json({ message: `No action taken for entry type "${rawType}".` }, { status: 200 });
  } catch (error) {
    console.error('[webhook][entry-change] Fatal error:', error);
    return NextResponse.json({ message: 'Internal server error while syncing entry.' }, { status: 500 });
  }
}

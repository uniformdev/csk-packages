import 'dotenv/config';
import type { Entry } from '@uniformdev/canvas';
import locales from '@/i18n/locales.json';
import { ENTRY_TYPES_TO_SYNC } from '../../constants';
import { transformEntryToResource } from '../../utils';
import { contentClient } from '../../utils/uniformClients';
import { createOrUpdateResource, deleteResource } from '../actions/resources';

const getAllEntriesFromCanvas = ({ limit = 50, offset = 0, ...restProps }): Promise<Entry[]> =>
  contentClient
    .getEntries({
      ...restProps,
      limit,
      offset,
      withTotalCount: true,
    })
    .then(async ({ entries, totalCount }): Promise<Entry[]> => {
      const newOffset = offset + limit;
      return totalCount && newOffset <= totalCount
        ? [...entries, ...(await getAllEntriesFromCanvas({ limit, offset: newOffset, ...restProps }))]
        : entries;
    })
    .catch(e => {
      console.error(e);
      return [];
    });

export async function loadResources(): Promise<void> {
  try {
    console.info(`[loadResources] Starting sync for entry types: ${ENTRY_TYPES_TO_SYNC.join(', ')}`);

    const entries = await getAllEntriesFromCanvas({
      filters: { type: { in: ENTRY_TYPES_TO_SYNC } },
      diagnostics: false,
      locale: locales.defaultLocale,
    });

    console.info(`[loadResources] Retrieved ${entries.length} entries from Canvas.`);

    const results = await Promise.all(
      entries.map<Promise<{ action: 'createdOrUpdated' | 'deleted' | 'error' }>>(async entry => {
        const resource = transformEntryToResource(entry);
        try {
          if (resource.textContent.length > 0) {
            await createOrUpdateResource(resource);
            console.info(`[loadResources] Created/updated resource '${resource.slug}' (ID: ${resource.id}).`);
            return { action: 'createdOrUpdated' };
          } else {
            await deleteResource(resource.id);
            console.info(`[loadResources] Deleted resource (ID: ${resource.id}) due to empty content.`);
            return { action: 'deleted' };
          }
        } catch (error) {
          console.error(`[loadResources] Error processing resource '${resource.slug}' (ID: ${resource.id}):`, error);
          return { action: 'error' };
        }
      })
    );

    const { createdOrUpdatedCount, deletedCount } = results.reduce(
      (acc, { action }): { createdOrUpdatedCount: number; deletedCount: number } => ({
        createdOrUpdatedCount: acc.createdOrUpdatedCount + (action === 'createdOrUpdated' ? 1 : 0),
        deletedCount: acc.deletedCount + (action === 'deleted' ? 1 : 0),
      }),
      { createdOrUpdatedCount: 0, deletedCount: 0 }
    );

    console.info(`[loadResources] Completed: ${createdOrUpdatedCount} created/updated, ${deletedCount} deleted.`);
    process.exit(0);
  } catch (error) {
    console.error('[loadResources] Fatal error during sync:', error);
    process.exit(1);
  }
}

loadResources();

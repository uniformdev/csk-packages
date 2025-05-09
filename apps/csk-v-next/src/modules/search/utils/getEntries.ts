'use server';

import { CANVAS_DRAFT_STATE, CANVAS_PUBLISHED_STATE, EntryFilters } from '@uniformdev/canvas';
import { Facets, Pagination, WithUniformContentEntrySystemParams } from '../types';
import contentClient from './contentClient';
import { mapUniformContentEntryFields } from './mappers';

interface GetEntriesProps {
  preview?: boolean;
  page: number;
  perPage: number;
  filters: EntryFilters;
  facetBy?: string;
  search?: string;
  keyword?: string;
  orderBy?: string;
}

const CHUNK_SIZE = 50;

const getEntries = async <T extends Record<string, unknown>>({
  preview = false,
  page,
  perPage,
  filters,
  facetBy,
  search = '',
  keyword = '',
  orderBy = 'created_at_DESC',
}: GetEntriesProps): Promise<{
  data: Pagination<WithUniformContentEntrySystemParams<T>>;
  facets: Facets;
}> => {
  const fetchEntries = async (offset = 0, accumulatedEntries: WithUniformContentEntrySystemParams<T>[] = []) => {
    try {
      const response = await contentClient.getEntries({
        filters,
        limit: Math.min(perPage - accumulatedEntries.length, CHUNK_SIZE),
        offset: offset,
        state: preview ? CANVAS_DRAFT_STATE : CANVAS_PUBLISHED_STATE,
        withTotalCount: true,
        orderBy: [orderBy],
        search: search,
        keyword: keyword,
        locale: 'en',
        facetBy,
      });

      const entries = response.entries.map(item => mapUniformContentEntryFields<T>(item.entry));
      const allEntries = [...accumulatedEntries, ...entries];

      if (allEntries.length < perPage && response.totalCount && response.totalCount > offset + entries.length) {
        return fetchEntries(offset + entries.length, allEntries);
      }

      return {
        data: {
          items: allEntries,
          total: response.totalCount ?? 0,
          page,
          perPage,
          totalPages: Math.ceil((response.totalCount ?? 0) / perPage),
        },
        facets: response.facets ?? {},
      };
    } catch (error) {
      console.error('121312312312312', error);
      return {
        data: { items: [], total: 0, page, perPage, totalPages: 0 },
        facets: {},
      };
    }
  };

  return fetchEntries(page * perPage);
};

export default getEntries;

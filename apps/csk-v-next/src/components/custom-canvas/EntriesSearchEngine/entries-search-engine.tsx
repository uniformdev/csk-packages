'use client';
import { FC } from 'react';
import { BlockValue, flattenValues } from '@uniformdev/canvas';
import { ComponentProps, UniformSlot } from '@uniformdev/canvas-next-rsc/component';
import { DEFAULT_PAGE_SIZE, FIRST_PAGE } from '@/modules/search/constants';
import EntriesSearchContextProvider from '@/modules/search/EntriesSearchContextProvider';
import {
  Article,
  ContentType,
  Facets,
  FilterBy,
  Pagination,
  Product,
  WithUniformContentEntrySystemParams,
} from '@/modules/search/types';

type EntriesSearchEngineParameters = {
  contentType: ContentType;
  filterBy: BlockValue;
  entries: Pagination<WithUniformContentEntrySystemParams<Article | Product>>;
  facets: Facets;
  selectedFilters?: Record<string, string[]>;
  search: string;
  page?: number;
  pageSize?: number;
};
type EntriesSearchEngineSlots = 'content';
type EntriesSearchEngineProps = ComponentProps<EntriesSearchEngineParameters, EntriesSearchEngineSlots>;

const EntriesSearchEngine: FC<EntriesSearchEngineProps> = ({
  component,
  context,
  slots,
  contentType,
  filterBy,
  entries,
  facets,
  selectedFilters,
  search,
  page,
  pageSize,
}) => {
  const mappedFilterBy = flattenValues(filterBy) as FilterBy[];

  return (
    <EntriesSearchContextProvider
      contentType={contentType}
      filterBy={mappedFilterBy}
      entries={entries}
      facets={facets}
      selectedFilters={selectedFilters || {}}
      search={search || ''}
      page={page || FIRST_PAGE}
      pageSize={pageSize || DEFAULT_PAGE_SIZE}
    >
      <UniformSlot data={component} context={context} slot={slots.content} />
    </EntriesSearchContextProvider>
  );
};

export default EntriesSearchEngine;

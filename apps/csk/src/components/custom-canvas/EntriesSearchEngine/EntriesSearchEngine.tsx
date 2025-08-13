'use client';
import { FC, ReactNode } from 'react';
import { DEFAULT_PAGE_SIZE, FIRST_PAGE } from '@/constants';
import EntriesSearchContextProvider from '@/providers/EntriesSearchContextProvider';
import {
  Article,
  ContentType,
  Facets,
  FilterBy,
  Pagination,
  Product,
  WithUniformContentEntrySystemParams,
  OrderBy,
  PageSize,
} from '@/types';

type EntriesSearchEngineParameters = {
  contentType?: ContentType;
  filterBy?: FilterBy[];
  entries: Pagination<WithUniformContentEntrySystemParams<Article | Product>>;
  facets: Facets;
  selectedFilters?: Record<string, string[]>;
  search: string;
  page?: number;
  pageSize: number;
  pageSizes: PageSize[];
  orderBy: OrderBy[];
  selectedOrderByQuery: string;
  content: ReactNode;
};

const EntriesSearchEngine: FC<EntriesSearchEngineParameters> = ({
  contentType,
  filterBy,
  entries,
  facets,
  selectedFilters,
  search,
  page,
  pageSize,
  pageSizes,
  orderBy,
  selectedOrderByQuery,
  content,
}) => {
  return (
    <EntriesSearchContextProvider
      contentType={contentType}
      filterBy={filterBy}
      entries={entries}
      facets={facets}
      selectedFilters={selectedFilters || {}}
      search={search || ''}
      page={page || FIRST_PAGE}
      pageSize={pageSize}
      pageSizes={pageSizes}
      orderBy={orderBy}
      selectedOrderByQuery={selectedOrderByQuery}
    >
      {content}
    </EntriesSearchContextProvider>
  );
};

export default EntriesSearchEngine;

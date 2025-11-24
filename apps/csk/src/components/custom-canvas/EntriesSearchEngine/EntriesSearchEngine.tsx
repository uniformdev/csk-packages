'use client';

import { FC, PropsWithChildren } from 'react';
import { FIRST_PAGE } from '@/constants';
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
  FilterQuery,
} from '@/types';

type EntriesSearchEngineParameters = PropsWithChildren<{
  contentType?: ContentType;
  filterBy?: FilterBy[];
  entries: Pagination<WithUniformContentEntrySystemParams<Article | Product>>;
  facets: Facets;
  pageSizes: PageSize[];
  orderBy: OrderBy[];
  selectedOrderByQuery: string;
  enrichmentBoostedOrderBy?: string;
  preview?: boolean;
  facetBy?: string;
  baseFilterQuery?: FilterQuery;
  defaultOrderByQuery?: string;
  filteredFilterBy?: FilterBy[];
  initPerPage?: number;
}>;

const EntriesSearchEngine: FC<EntriesSearchEngineParameters> = ({
  contentType,
  filterBy,
  entries,
  facets,
  pageSizes,
  orderBy,
  selectedOrderByQuery,
  enrichmentBoostedOrderBy,
  preview,
  facetBy,
  baseFilterQuery,
  defaultOrderByQuery,
  filteredFilterBy,
  initPerPage,
  children,
}) => {
  return (
    <EntriesSearchContextProvider
      contentType={contentType}
      filterBy={filterBy}
      initEntries={entries}
      initFacets={facets}
      pageSizes={pageSizes}
      orderBy={orderBy}
      selectedOrderByQuery={selectedOrderByQuery}
      enrichmentBoostedOrderBy={enrichmentBoostedOrderBy}
      preview={preview}
      facetBy={facetBy}
      baseFilterQuery={baseFilterQuery}
      defaultOrderByQuery={defaultOrderByQuery}
      filteredFilterBy={filteredFilterBy}
      initPerPage={initPerPage}
    >
      {children}
    </EntriesSearchContextProvider>
  );
};

export default EntriesSearchEngine;

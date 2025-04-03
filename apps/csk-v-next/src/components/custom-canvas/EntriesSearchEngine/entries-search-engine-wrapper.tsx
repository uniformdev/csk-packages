import { FC } from 'react';
import { draftMode } from 'next/headers';
import { BlockValue, flattenValues } from '@uniformdev/canvas';
import { ComponentProps } from '@uniformdev/canvas-next-rsc/component';
import {
  ENTRIES_SEARCH_ORDER_BY_KEY,
  ENTRIES_SEARCH_PAGE_KEY,
  ENTRIES_SEARCH_PAGE_SIZE_KEY,
  ENTRIES_SEARCH_QUERY_KEY,
} from '@/modules/search/constants';
import { DEFAULT_PAGE_SIZE } from '@/modules/search/constants';
import { FIRST_PAGE } from '@/modules/search/constants';
import { ContentType, FilterBy, Article, Product, OrderBy, FilterQuery, PageSize } from '@/modules/search/types';
import getEntries from '@/modules/search/utils/getEntries';
import getFacets from '@/modules/search/utils/getFacets';
import EntriesSearchEngine from './entries-search-engine';
type EntriesSearchEngineParameters = {
  contentType: ContentType;
  filterBy: BlockValue;
  orderBy?: BlockValue;
  baseFilters?: BlockValue;
  pageSizes?: BlockValue;
};
type EntriesSearchEngineSlots = 'content';
type EntriesSearchEngineProps = ComponentProps<EntriesSearchEngineParameters, EntriesSearchEngineSlots>;

const EntriesSearchEngineWrapper: FC<EntriesSearchEngineProps> = async props => {
  const { isEnabled } = await draftMode();
  const searchParams = props.context.searchParams;
  const search = searchParams?.[ENTRIES_SEARCH_QUERY_KEY] || '';
  const filterBy = flattenValues(props.filterBy) as FilterBy[];
  const baseFilters = flattenValues(props.baseFilters) as FilterBy[];
  const orderBy = flattenValues(props.orderBy) as OrderBy[];
  const pageSizes = flattenValues(props.pageSizes) as PageSize[];

  const contentType = props.contentType;

  const baseFilterQuery = baseFilters
    ? baseFilters.reduce<FilterQuery>((acc, filter) => {
        return {
          ...acc,
          [`${filter.fieldKey}[eq]`]: filter.values.map(value => value.value),
        };
      }, {})
    : {};

  const facetBy = filterBy
    ?.filter(filter => filter.enableFaceting)
    .map(filter => filter.fieldKey)
    .join(',');

  const baseFacets =
    baseFilters?.length > 0
      ? await getFacets({
          filters: {
            type: { eq: contentType },
            ...baseFilterQuery,
          },
          facetBy,
          preview: isEnabled,
        })
      : {};

  // filter filterBy by baseFacets
  const filteredFilterBy = filterBy?.map(filter => {
    if (!filter.enableFaceting) return filter;
    const baseFacet = baseFacets[filter.fieldKey];
    if (!baseFacet) return filter;
    const baseFilterValues = baseFilterQuery[`${filter.fieldKey}[eq]`] || [];

    const facetsWithValues = Object.keys(baseFacet);
    // filter all empty values and values that are present in baseFilters
    const values = filter.values.filter(filterValue => {
      return facetsWithValues.includes(filterValue.value) && !baseFilterValues.includes(filterValue.value);
    });
    return { ...filter, values };
  });

  const selectedFilters = filteredFilterBy?.reduce(
    (acc, filter) => {
      const value = searchParams?.[filter.fieldId];
      if (value) {
        acc[filter.fieldKey] = Array.isArray(value) ? value : [value];
      }
      return acc;
    },
    {} as Record<string, string[]>
  );

  const filterQuery = Object.entries(selectedFilters).reduce((acc, [fieldKey, values]) => {
    if (!values || values.length === 0) return acc;
    const filterType = filterBy.find(f => f.fieldKey === fieldKey)?.type;

    if (filterType === 'range') {
      const [min, max] = values;
      return {
        ...acc,
        [`${fieldKey}[gte]`]: min,
        [`${fieldKey}[lte]`]: max,
      };
    }

    return {
      ...acc,
      [`${fieldKey}[in]`]: values,
    };
  }, {});

  const selectedPage = Number(searchParams?.[ENTRIES_SEARCH_PAGE_KEY]) - 1;
  const page = selectedPage && selectedPage > 0 ? selectedPage : FIRST_PAGE;
  const perPage = Number(searchParams?.[ENTRIES_SEARCH_PAGE_SIZE_KEY]) || pageSizes?.[0]?.size || DEFAULT_PAGE_SIZE;
  const defaultOrderByQuery = orderBy?.[0] ? `${orderBy[0].field}_${orderBy[0].direction}` : 'created_at_DESC';
  const selectedOrderByQuery = searchParams?.[ENTRIES_SEARCH_ORDER_BY_KEY] || defaultOrderByQuery;

  const { data, facets } = await getEntries<Article | Product>({
    page,
    perPage,
    filters: {
      type: { eq: contentType },
      ...baseFilterQuery,
      ...filterQuery,
    },
    facetBy,
    search,
    preview: isEnabled,
    orderBy: selectedOrderByQuery,
  });

  return (
    <EntriesSearchEngine
      {...props}
      filterBy={filteredFilterBy}
      entries={data}
      facets={facets}
      selectedFilters={selectedFilters}
      search={search}
      page={page}
      pageSize={perPage}
      orderBy={orderBy}
      selectedOrderByQuery={selectedOrderByQuery}
      pageSizes={pageSizes}
    />
  );
};

export default EntriesSearchEngineWrapper;

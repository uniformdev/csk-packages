import { FC, Suspense } from 'react';
import { draftMode } from 'next/headers';
import { UniformSlot } from '@uniformdev/canvas-next-rsc-v2/component';
import { ComponentProps } from '@uniformdev/csk-components/types/cskTypes';
import { withFlattenParameters } from '@uniformdev/csk-components/utils/withFlattenParameters';
import {
  ENTRIES_SEARCH_ORDER_BY_KEY,
  ENTRIES_SEARCH_PAGE_KEY,
  ENTRIES_SEARCH_PAGE_SIZE_KEY,
  ENTRIES_SEARCH_QUERY_KEY,
} from '@/constants';
import { DEFAULT_PAGE_SIZE } from '@/constants';
import { FIRST_PAGE } from '@/constants';
import { ContentType, FilterBy, Article, Product, OrderBy, FilterQuery, PageSize } from '@/types';
import { getEnrichmentBoostedOrderBy } from '@/utils/getEnrichmentBoostedOrderBy';
import getEntries from '@/utils/getEntries';
import getFacets from '@/utils/getFacets';
import getSearchParamsFromUrl from '@/utils/getSearchParamsFromUrl';
import EntriesSearchEngine from './EntriesSearchEngine';

type EntriesSearchEngineParameters = {
  contentType?: ContentType;
  filterBy?: FilterBy[];
  orderBy?: OrderBy[];
  baseFilters?: FilterBy[];
  pageSizes?: PageSize[];
  boostEnrichments?: string[];
};
type EntriesSearchEngineSlots = 'content' | 'fallback';
type EntriesSearchEngineProps = ComponentProps<EntriesSearchEngineParameters, EntriesSearchEngineSlots>;

const EntriesSearchEngineWrapper: FC<EntriesSearchEngineProps & EntriesSearchEngineParameters> = async props => {
  const { isEnabled } = await draftMode();
  const searchQuery = props.context.pageState?.keys?.search || '';

  const searchParams = getSearchParamsFromUrl(searchQuery);

  const search = (searchParams?.[ENTRIES_SEARCH_QUERY_KEY] as string) || '';
  const filterBy = props.filterBy || [];
  const baseFilters = props.baseFilters || [];
  const orderBy = props.orderBy || [];
  const pageSizes = props.pageSizes || [];
  const contentType = props.contentType;
  const boostEnrichments = props.boostEnrichments || [];
  const enrichmentBoostedOrderBy = await getEnrichmentBoostedOrderBy(boostEnrichments);

  const orderByWithRelevance: OrderBy[] =
    boostEnrichments.length > 0 && enrichmentBoostedOrderBy
      ? orderBy
      : orderBy.filter(order => order.field !== 'relevance');

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
    contentType && baseFilters?.length > 0
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
    const baseFacet = baseFacets?.[filter.fieldKey];
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
  const defaultOrderByQuery = orderByWithRelevance?.[0]
    ? `${orderByWithRelevance[0].field}_${orderByWithRelevance[0].direction}`
    : 'created_at_DESC';
  const selectedOrderByQuery = (searchParams?.[ENTRIES_SEARCH_ORDER_BY_KEY] as string) || defaultOrderByQuery;

  const { data, facets } = await getEntries<Article | Product>({
    page,
    perPage,
    filters: {
      type: contentType ? { eq: contentType } : undefined,
      ...baseFilterQuery,
      ...filterQuery,
    },
    facetBy,
    search,
    preview: isEnabled,
    orderBy: selectedOrderByQuery === 'relevance_DESC' ? enrichmentBoostedOrderBy : selectedOrderByQuery,
  });

  return (
    <EntriesSearchEngine
      {...props}
      filteredFilterBy={filteredFilterBy}
      entries={data}
      facets={facets}
      orderBy={orderByWithRelevance}
      selectedOrderByQuery={selectedOrderByQuery}
      pageSizes={pageSizes}
      enrichmentBoostedOrderBy={enrichmentBoostedOrderBy}
      preview={isEnabled}
      facetBy={facetBy}
      baseFilterQuery={baseFilterQuery}
      defaultOrderByQuery={defaultOrderByQuery}
      initPerPage={perPage}
    >
      <UniformSlot slot={props.slots.content} />
    </EntriesSearchEngine>
  );
};

const SuspenseProvider = (props: EntriesSearchEngineProps) =>
  props.slots.fallback?.items?.length ? (
    <Suspense fallback={<UniformSlot slot={props.slots.fallback} />}>
      <EntriesSearchEngineWrapper {...props} />
    </Suspense>
  ) : (
    <EntriesSearchEngineWrapper {...props} />
  );

export default withFlattenParameters(SuspenseProvider, { levels: 2 });

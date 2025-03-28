import { FC } from 'react';
import { draftMode } from 'next/headers';
import { BlockValue, flattenValues } from '@uniformdev/canvas';
import { ComponentProps } from '@uniformdev/canvas-next-rsc/component';
import { ENTRIES_SEARCH_PAGE_KEY, ENTRIES_SEARCH_QUERY_KEY } from '@/modules/search/constants';
import { DEFAULT_PAGE_SIZE } from '@/modules/search/constants';
import { FIRST_PAGE } from '@/modules/search/constants';
import { ContentType, FilterBy, Article, Product } from '@/modules/search/types';
import getEntries from '@/modules/search/utils/getEntries';
import EntriesSearchEngine from './entries-search-engine';
type EntriesSearchEngineParameters = {
  contentType: ContentType;
  filterBy: BlockValue;
  itemsPerPage: number;
};
type EntriesSearchEngineSlots = 'content';
type EntriesSearchEngineProps = ComponentProps<EntriesSearchEngineParameters, EntriesSearchEngineSlots>;

const EntriesSearchEngineWrapper: FC<EntriesSearchEngineProps> = async props => {
  const { isEnabled } = await draftMode();
  const searchParams = props.context.searchParams;
  const search = searchParams?.[ENTRIES_SEARCH_QUERY_KEY] || '';
  const filterBy = flattenValues(props.filterBy) as FilterBy[];
  const contentType = props.contentType;

  const initialFilters = filterBy?.reduce(
    (acc, filter) => {
      const value = searchParams?.[filter.fieldId];
      if (value) {
        acc[filter.fieldKey] = Array.isArray(value) ? value : [value];
      }
      return acc;
    },
    {} as Record<string, string[]>
  );

  const filterQuery = Object.entries(initialFilters).reduce((acc, [fieldId, values]) => {
    if (!values || values.length === 0) return acc;
    return {
      ...acc,
      [fieldId]: { in: values },
    };
  }, {});

  const facetBy = filterBy?.map(filter => filter.fieldKey).join(',');
  const page = Number(searchParams?.[ENTRIES_SEARCH_PAGE_KEY]) - 1 || FIRST_PAGE;
  const perPage = props.itemsPerPage || DEFAULT_PAGE_SIZE;

  const { data, facets } = await getEntries<Article | Product>({
    page,
    perPage,
    filters: {
      type: { eq: contentType },
      ...filterQuery,
    },
    facetBy,
    search,
    preview: isEnabled,
  });

  return (
    <EntriesSearchEngine
      {...props}
      entries={data}
      facets={facets}
      selectedFilters={initialFilters}
      search={search}
      page={page}
      pageSize={perPage}
    />
  );
};

export default EntriesSearchEngineWrapper;

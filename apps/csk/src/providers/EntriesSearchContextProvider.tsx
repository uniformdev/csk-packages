'use client';

import {
  createContext,
  FC,
  useContext,
  useMemo,
  useCallback,
  useState,
  useEffect,
  SetStateAction,
  Dispatch,
  useRef,
} from 'react';
import { usePathname, useRouter } from 'next/navigation';
import {
  DEFAULT_PAGE_SIZE,
  ENTRIES_SEARCH_ORDER_BY_KEY,
  ENTRIES_SEARCH_PAGE_KEY,
  ENTRIES_SEARCH_PAGE_SIZE_KEY,
  ENTRIES_SEARCH_QUERY_KEY,
  FIRST_PAGE,
} from '@/constants';
import {
  ContentType,
  FilterBy,
  Pagination,
  WithUniformContentEntrySystemParams,
  Article,
  Product,
  Facets,
  OrderBy,
  PageSize,
  FilterQuery,
} from '@/types';
import getEntries from '@/utils/getEntries';
import getSearchParamsFromUrl from '@/utils/getSearchParamsFromUrl';

interface EntriesSearchContextType {
  contentType?: ContentType;
  search: string;
  setSearch: (search: string) => void;
  setPage: (page: number) => void;
  setPageSize: (pageSize: number) => void;
  pageSize: number;
  pageSizes: PageSize[];
  page: number;
  filterBy?: FilterBy[];
  selectedFilters: Record<string, string[]>;
  setSelectedFilters: (selectedFilters: Record<string, string[]>) => void;
  entries: Pagination<WithUniformContentEntrySystemParams<Article | Product>>;
  facets: Facets | null;
  isLoading: boolean;
  clearFilters: () => void;
  searchBoxValue: string;
  setSearchBoxValue: Dispatch<SetStateAction<string>>;
  orderBy: OrderBy[];
  selectedOrderByQuery: string;
  setOrderBy: (orderByQuery: string) => void;
  filteredFilterBy?: FilterBy[];
}

const EntriesSearchContext = createContext<EntriesSearchContextType>({
  contentType: ContentType.Product,
  search: '',
  setSearch: () => {},
  setPage: () => {},
  setPageSize: () => {},
  pageSize: DEFAULT_PAGE_SIZE,
  pageSizes: [],
  page: FIRST_PAGE,
  filterBy: [],
  selectedFilters: {},
  setSelectedFilters: () => {},
  entries: {
    items: [],
    page: FIRST_PAGE,
    perPage: DEFAULT_PAGE_SIZE,
    total: 0,
    totalPages: 0,
  },
  facets: null,
  isLoading: false,
  clearFilters: () => {},
  searchBoxValue: '',
  setSearchBoxValue: () => {},
  orderBy: [],
  selectedOrderByQuery: '',
  setOrderBy: () => {},
  filteredFilterBy: [],
});

type EntriesSearchContextProviderProps = {
  children: React.ReactNode;
  filteredFilterBy?: FilterBy[];
  pageSizes: PageSize[];
  contentType?: ContentType;
  orderBy: OrderBy[];
  selectedOrderByQuery: string;
  initEntries: Pagination<WithUniformContentEntrySystemParams<Article | Product>>;
  initFacets: Facets;
  enrichmentBoostedOrderBy?: string;
  preview?: boolean;
  facetBy?: string;
  baseFilterQuery?: FilterQuery;
  defaultOrderByQuery?: string;
  filterBy?: FilterBy[];
};

const EntriesSearchContextProvider: FC<EntriesSearchContextProviderProps> = ({
  children,
  filteredFilterBy = [],
  contentType,
  orderBy,
  selectedOrderByQuery,
  pageSizes,
  initEntries,
  initFacets,
  enrichmentBoostedOrderBy,
  facetBy,
  preview,
  baseFilterQuery,
  defaultOrderByQuery,
  filterBy = [],
}) => {
  const isActiveClientSideSearch = useRef(false);
  const router = useRouter();
  const pathname = usePathname();
  const [newSearchParams, setNewSearchParams] = useState(getSearchParamsFromUrl(window.location.href));
  const [searchBoxValue, setSearchBoxValue] = useState((newSearchParams?.[ENTRIES_SEARCH_QUERY_KEY] as string) || '');
  const [isLoading, setIsLoading] = useState(false);
  const [entries, setEntries] = useState(initEntries);
  const [facets, setFacets] = useState(initFacets);

  const page =
    Number(newSearchParams?.[ENTRIES_SEARCH_PAGE_KEY]) - 1 && Number(newSearchParams?.[ENTRIES_SEARCH_PAGE_KEY]) - 1 > 0
      ? Number(newSearchParams?.[ENTRIES_SEARCH_PAGE_KEY]) - 1
      : FIRST_PAGE;
  const search = (newSearchParams?.[ENTRIES_SEARCH_QUERY_KEY] as string) || '';
  const perPage = Number(newSearchParams?.[ENTRIES_SEARCH_PAGE_SIZE_KEY]) || DEFAULT_PAGE_SIZE;
  const selectedFilters = useMemo(
    () =>
      filteredFilterBy?.reduce(
        (acc, filter) => {
          const value = newSearchParams?.[filter.fieldId];
          if (value) {
            acc[filter.fieldKey] = Array.isArray(value) ? value : [value];
          }
          return acc;
        },
        {} as Record<string, string[]>
      ),
    [filteredFilterBy, newSearchParams]
  );

  useEffect(() => {
    if (!isActiveClientSideSearch.current) return;
    const updateState = async () => {
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

      const newSelectedOrderByQuery = (newSearchParams?.[ENTRIES_SEARCH_ORDER_BY_KEY] as string) || defaultOrderByQuery;

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
        preview,
        orderBy: newSelectedOrderByQuery === 'relevance_DESC' ? enrichmentBoostedOrderBy : newSelectedOrderByQuery,
      });

      setEntries(data);
      setFacets(facets);
    };

    setIsLoading(true);
    updateState()
      .catch(error => console.error(error))
      .finally(() => setIsLoading(false));
  }, [
    baseFilterQuery,
    contentType,
    defaultOrderByQuery,
    enrichmentBoostedOrderBy,
    facetBy,
    filterBy,
    newSearchParams,
    page,
    perPage,
    preview,
    search,
    selectedFilters,
  ]);

  const updateUrl = useCallback(
    (params: URLSearchParams, { replace = false }: { replace?: boolean } = {}) => {
      const qs = params.toString();
      const url = qs ? `${pathname}?${qs}` : pathname;
      if (replace) {
        window.history.replaceState({}, '', url);
      } else {
        window.history.pushState({}, '', url);
      }
      setNewSearchParams(getSearchParamsFromUrl(window.location.href));
      isActiveClientSideSearch.current = true;
    },
    [pathname]
  );

  const setSearch = useCallback(
    (value: string) => {
      const params = new URLSearchParams(window.location.search);
      params.delete(ENTRIES_SEARCH_PAGE_KEY);
      if (!value) {
        params.delete(ENTRIES_SEARCH_QUERY_KEY);
      } else {
        params.set(ENTRIES_SEARCH_QUERY_KEY, value);
      }
      updateUrl(params, { replace: true });
    },
    [updateUrl]
  );

  const setPage = useCallback(
    (p: number) => {
      const params = new URLSearchParams(window.location.search);
      if (p === 0) {
        params.delete(ENTRIES_SEARCH_PAGE_KEY);
      } else {
        params.set(ENTRIES_SEARCH_PAGE_KEY, (p + 1).toString());
      }
      updateUrl(params); // pushState
    },
    [updateUrl]
  );

  const setPageSize = useCallback(
    (size: number) => {
      const params = new URLSearchParams(window.location.search);
      params.delete(ENTRIES_SEARCH_PAGE_KEY);
      params.set(ENTRIES_SEARCH_PAGE_SIZE_KEY, size.toString());
      updateUrl(params);
    },
    [updateUrl]
  );

  const setOrderBy = useCallback(
    (orderByQuery: string) => {
      const params = new URLSearchParams(window.location.search);
      params.delete(ENTRIES_SEARCH_PAGE_KEY);
      params.set(ENTRIES_SEARCH_ORDER_BY_KEY, orderByQuery);
      updateUrl(params);
    },
    [updateUrl]
  );

  const setSelectedFilters = useCallback(
    (nextSelected: Record<string, string[]>) => {
      const params = new URLSearchParams();
      params.delete(ENTRIES_SEARCH_PAGE_KEY);
      if (search) {
        params.set(ENTRIES_SEARCH_QUERY_KEY, search);
      }
      Object.entries(nextSelected).forEach(([key, value]) => {
        const filter = filteredFilterBy?.find(f => f.fieldKey === key);
        if (!filter) return;
        value.forEach(v => {
          params.append(filter.fieldId, v);
        });
      });
      updateUrl(params);
    },
    [filteredFilterBy, search, updateUrl]
  );

  const clearFilters = useCallback(() => {
    setIsLoading(true);
    router.push(pathname);
  }, [pathname, router]);

  const value: EntriesSearchContextType = useMemo(() => {
    return {
      search,
      setSearch,
      pageSize: perPage,
      page,
      setPage,
      setPageSize,
      pageSizes,
      filteredFilterBy,
      contentType,
      selectedFilters,
      setSelectedFilters,
      orderBy,
      setOrderBy,
      selectedOrderByQuery,
      entries,
      facets,
      isLoading,
      clearFilters,
      searchBoxValue,
      setSearchBoxValue,
    };
  }, [
    clearFilters,
    contentType,
    entries,
    facets,
    filteredFilterBy,
    isLoading,
    orderBy,
    page,
    pageSizes,
    perPage,
    search,
    searchBoxValue,
    selectedFilters,
    selectedOrderByQuery,
    setOrderBy,
    setPage,
    setPageSize,
    setSearch,
    setSelectedFilters,
  ]);

  return <EntriesSearchContext.Provider value={value}>{children}</EntriesSearchContext.Provider>;
};

export default EntriesSearchContextProvider;

export const useEntriesSearchContext = () => {
  const context = useContext(EntriesSearchContext);
  if (!context) {
    throw new Error('useEntriesSearchContext must be used within a EntriesSearchContextProvider');
  }
  return context;
};

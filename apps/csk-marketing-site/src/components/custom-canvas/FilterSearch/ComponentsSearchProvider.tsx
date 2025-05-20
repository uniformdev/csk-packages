'use client';

import {
  createContext,
  Dispatch,
  FC,
  PropsWithChildren,
  SetStateAction,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { CompositionGetListResponse } from '@uniformdev/canvas';
import { useGetSearchEngine } from '@/utils/uniformSearchFilter';

const PATTERN_SEARCH_ENDPOINT = '/api/getPatterns';

interface UniformSearchFilterEngineContextProps {
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
  pageSize: number;
  totalPages: number;
  totalCount: number;
  currentPage: number;
  allowCategoryIds: string[];
  setAllowPatternIds: Dispatch<SetStateAction<string[]>>;
  setCurrentPage: Dispatch<SetStateAction<number>>;
  setAllowCategoryIds: Dispatch<SetStateAction<string[]>>;
  isLoading: boolean;
  result: CompositionGetListResponse['compositions'] | undefined;
}

export const UniformSearchFilterEngineContext = createContext<UniformSearchFilterEngineContextProps>({
  search: '',
  setSearch: () => null,
  pageSize: 50,
  totalPages: 0,
  totalCount: 0,
  currentPage: 0,
  allowCategoryIds: [],
  setAllowPatternIds: () => null,
  setCurrentPage: () => null,
  setAllowCategoryIds: () => null,
  isLoading: false,
  result: undefined,
});

type ComponentsSearchProviderProps = PropsWithChildren<{
  pageSize?: number;
}>;

const ComponentsSearchProvider: FC<PropsWithChildren<ComponentsSearchProviderProps>> = ({
  children,
  pageSize: initPageSize = 50,
}) => {
  const pageSize = Number(initPageSize);
  const [enableSearch, setEnableSearch] = useState(false);

  const [allowPatternIds, setAllowPatternIds] = useState<string[]>([]);
  const [allowCategoryIds, setAllowCategoryIds] = useState<string[]>([]);
  const [search, setSearch] = useState<string>('');
  const [additionalFilters, setAdditionalFilters] = useState<Record<string, unknown>>({});
  const [totalCount, setTotalCount] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [result, setResult] = useState<CompositionGetListResponse['compositions'] | undefined>(undefined);

  useEffect(() => {
    setCurrentPage(0);
  }, [pageSize]);

  const searchEngine = useGetSearchEngine({
    endpoint: PATTERN_SEARCH_ENDPOINT,
    setIsLoading,
    setTotalCount,
    setResult,
  });

  useEffect(() => {
    if (!enableSearch) {
      if (!!search.length || !!allowCategoryIds?.length) {
        setEnableSearch(true);
      }
      return;
    }
    searchEngine({
      search,
      pattern: true,
      withTotalCount: true,
      limit: pageSize,
      filters: {
        type: { eq: 'demoCard' },
        ...(allowPatternIds?.length ? { entityId: { in: allowPatternIds } } : undefined),
        ...(allowCategoryIds?.length ? { categoryId: { in: allowCategoryIds } } : undefined),
      },

      offset: currentPage * pageSize,
    });
  }, [additionalFilters, allowCategoryIds, allowPatternIds, currentPage, enableSearch, pageSize, search, searchEngine]);

  const value = useMemo(
    () => ({
      search,
      pageSize,
      currentPage,
      totalPages: Math.ceil(totalCount / pageSize),
      totalCount,
      isLoading,
      allowCategoryIds,
      setSearch,
      setAdditionalFilters,
      setAllowPatternIds,
      setAllowCategoryIds,
      setCurrentPage,
      result,
    }),
    [allowCategoryIds, currentPage, isLoading, pageSize, result, search, totalCount]
  );

  return (
    <UniformSearchFilterEngineContext.Provider value={value}>{children}</UniformSearchFilterEngineContext.Provider>
  );
};

export default ComponentsSearchProvider;

export const useUniformSearchFilterEngineContext = () => useContext(UniformSearchFilterEngineContext);

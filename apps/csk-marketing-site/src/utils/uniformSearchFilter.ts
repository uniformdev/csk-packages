import { Dispatch, SetStateAction } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import {
  CompositionFilters,
  CompositionGetListResponse,
  CompositionGetParameters,
  CompositionResolvedListResponse,
} from '@uniformdev/canvas';

export const useGetSearchEngine = ({
  endpoint,
  setIsLoading,
  setTotalCount,
  setResult,
  wait = 300,
}: {
  endpoint: string;
  setIsLoading?: Dispatch<SetStateAction<boolean>>;
  setTotalCount?: Dispatch<SetStateAction<number>>;
  setResult?: Dispatch<SetStateAction<CompositionGetListResponse['compositions'] | undefined>>;
  wait?: number;
}) =>
  useDebouncedCallback(
    (
      body: Omit<CompositionGetParameters, 'projectId' | 'componentId' | 'compositionId' | 'slug'> & {
        filters?: CompositionFilters;
      } & (
          | {
              resolveData: true;
              diagnostics?: boolean;
            }
          | {
              resolveData?: false;
            }
        )
    ) => {
      setIsLoading?.(true);
      fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
        .then(response => response.json())
        .then((result: CompositionGetListResponse | CompositionResolvedListResponse | null) => {
          const { compositions = [], totalCount = 0 } = result || {};
          setTotalCount?.(totalCount);
          setResult?.(compositions);
        })
        .catch(error => console.error(error))
        .finally(() => setIsLoading?.(false));
    },
    wait
  );

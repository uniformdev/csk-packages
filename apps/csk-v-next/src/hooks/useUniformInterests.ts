import { useMemo } from 'react';
import { AppDirectoryContext } from '@uniformdev/canvas-next-rsc-shared';

export const useUniformInterests = (context: AppDirectoryContext | undefined) => {
  const { scores } = context || {};
  const result = useMemo(() => {
    return {
      interests: scores,
      count: Object.values(scores || {}).reduce<number>((acc, value) => acc + value, 0) || 0,
    };
  }, [scores]);

  return result;
};

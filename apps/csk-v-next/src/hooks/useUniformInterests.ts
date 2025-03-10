import { useMemo } from 'react';
import { AppDirectoryContext } from '@uniformdev/canvas-next-rsc-shared';
import { EnrichmentKeys } from '@/chat/constants';

type EnrichmentKey = (typeof EnrichmentKeys)[number];

export type UniformInterestsResult = {
  interests: Readonly<Partial<Record<EnrichmentKey, ReadonlyArray<{ id: string; score: number }>>>>;
  count: number;
};

export const useUniformInterests = (context: AppDirectoryContext | undefined) => {
  const { scores } = context || {};
  const result = useMemo<UniformInterestsResult>(() => {
    const interests: Partial<Record<EnrichmentKey, { id: string; score: number }[]>> = {};
    let count = 0;
    if (!scores) {
      return { interests: {}, count: 0 };
    }

    for (const [key, value] of Object.entries(scores)) {
      const enrichmentKey = EnrichmentKeys.find(k => key.startsWith(`${k}_`));
      if (enrichmentKey && typeof value === 'number' && value > 0) {
        interests[enrichmentKey] = interests[enrichmentKey] || [];

        const pieces = key.split('_');
        const id = pieces.slice(1).join('_');

        count += value;
        interests[enrichmentKey]!.push({
          id,
          score: value,
        });
      }
    }

    Object.keys(interests).forEach(key => {
      interests[key as EnrichmentKey]!.sort((a, b) => b.score - a.score);
    });

    return {
      interests,
      count,
    };
  }, [scores]);

  return result;
};

'use server';

import { cookies } from 'next/headers';
import { CookieTransitionDataStore } from '@uniformdev/context';

const getOrderByClause = (userType: Record<string, { value: string; score: number }[]>) => {
  const orderFields = Object.entries(userType).map(([fieldKey, values]) => {
    return values.map(({ value, score }) => `fields.${fieldKey}.slug:${value}:${score}`).join('|');
  });

  return `boost|${orderFields.join('|')}`;
};

const getEnrichmentAndFieldKey = (enrichment: string) => {
  const [enrichmentKey, fieldKey] = enrichment.split(',');

  return { enrichmentKey, fieldKey };
};

export const getEnrichmentBoostedOrderBy = async (boostEnrichments: string[]) => {
  const cookieStore = await cookies();

  const scoreCookie = cookieStore.get('ufvd')?.value;

  const transitionStore = new CookieTransitionDataStore({
    serverCookieValue: scoreCookie,
    experimental_quirksEnabled: true,
  });

  const enrichmentScores = transitionStore.data?.scores;

  const boostInclusions = boostEnrichments.reduce<{ [key: string]: { value: string; score: number }[] }>(
    (acc, enrichment) => {
      const { enrichmentKey, fieldKey } = getEnrichmentAndFieldKey(enrichment);

      const allBoostEnrichmentKeys = Object.keys(enrichmentScores ?? {})
        .filter(key => key.startsWith(enrichmentKey))
        .map(key => {
          const [_, value] = key.split('_');

          return {
            value,
            score: enrichmentScores?.[key] ?? 0,
          };
        });

      if (allBoostEnrichmentKeys.length > 0) {
        return { ...acc, [fieldKey]: allBoostEnrichmentKeys };
      }

      return acc;
    },
    {}
  );

  if (Object.keys(boostInclusions).length === 0) {
    return undefined;
  }

  const orderBy = getOrderByClause(boostInclusions);

  return orderBy;
};

import { CookieTransitionDataStore } from '@uniformdev/context';
import { BoostInclusions } from '@/types';
import { getEnrichmentAndFieldKey, getEnrichmentKeysWithScore, getOrderByClause } from './search';

export const filterMaxScores = (data: BoostInclusions): BoostInclusions => {
  const bestByCategory = Object.entries(data).reduce<Record<string, { key: string; value: string; score: number }>>(
    (acc, [key, value]) => {
      const [, category] = key.split(',');
      const current = acc[category];

      return !current || value.score > current.score ? { ...acc, [category]: { key, ...value } } : acc;
    },
    {}
  );
  return Object.values(bestByCategory).reduce<BoostInclusions>(
    (res, { key, ...rest }) => ({ ...res, [key]: rest }),
    {}
  );
};

export const getEnrichmentBoostedOrderBy = async (boostEnrichments: string[], scoreCookie: string) => {
  const transitionStore = new CookieTransitionDataStore({
    serverCookieValue: scoreCookie,
    experimental_quirksEnabled: true,
  });

  const enrichmentScores = transitionStore.data?.scores || {};

  const boostInclusions = boostEnrichments.reduce<BoostInclusions>((acc, enrichment) => {
    const { enrichmentKey, fieldKey } = getEnrichmentAndFieldKey(enrichment);
    if (!enrichmentKey || !fieldKey) {
      return acc;
    }

    const enrichmentKeys = getEnrichmentKeysWithScore(enrichmentKey, enrichmentScores);

    enrichmentKeys.forEach((key, index) => {
      const [, boostValue = ''] = key.split('_') ?? [];
      const score = enrichmentScores[key] || 0;
      if (boostValue && score > 0) {
        const uniqueKey = enrichmentKeys.length > 1 ? `${enrichmentKey}_${index},${fieldKey}` : enrichment;
        acc[uniqueKey] = { value: boostValue, score };
      }
    });
    return acc;
  }, {});

  // Call filterMaxScores to get the maximum number of inclusions for score boosts, since a maximum of 3 boosts can be defined
  const orderBy = getOrderByClause(filterMaxScores(boostInclusions), 3);

  return orderBy;
};

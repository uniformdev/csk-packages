import { cookies } from 'next/headers';
import { CookieTransitionDataStore, UNIFORM_DEFAULT_COOKIE_NAME } from '@uniformdev/context';
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

export const getEnrichmentBoostedOrderBy = async (boostEnrichments: string[]) => {
  const cookieStore = await cookies();

  const scoreCookie = cookieStore.get(UNIFORM_DEFAULT_COOKIE_NAME)?.value;

  const transitionStore = new CookieTransitionDataStore({
    serverCookieValue: scoreCookie,
    experimental_quirksEnabled: true,
  });

  const enrichmentScores = transitionStore.data?.scores || {};

  if (Object.keys(enrichmentScores).length === 0) {
    return undefined;
  }
  const boostInclusions = boostEnrichments.reduce<BoostInclusions>((acc, enrichment, enrichmentIndex) => {
    const { enrichmentKey, fieldKey } = getEnrichmentAndFieldKey(enrichment);
    if (!enrichmentKey || !fieldKey) {
      return acc;
    }

    const enrichmentKeys = getEnrichmentKeysWithScore(enrichmentKey, enrichmentScores);

    enrichmentKeys.forEach((key, index) => {
      const [, boostValue = ''] = key.split('_') ?? [];
      // Exponential scoring with minimum of 100: ensures boost always dominates text relevance
      // Position 0 = 1000, Position 1 = 100, Position 2 = 100 (minimum)
      const score = enrichmentScores[key] || 0;
      // Math.max(100, Math.pow(1, 3 - enrichmentIndex));
      if (boostValue && score > 0) {
        const uniqueKey = enrichmentKeys.length > 1 ? `${enrichmentKey}_${index},${fieldKey}` : enrichment;
        acc[uniqueKey] = { value: boostValue, score };
      }
    });
    return acc;
  }, {});

  const filteredInclusions = filterMaxScores(boostInclusions);
  
  // Call filterMaxScores to get the maximum number of inclusions for score boosts, since a maximum of 3 boosts can be defined
  const orderBy = getOrderByClause(filteredInclusions, 3);
  
  return orderBy;
};

import { ScoreVector } from '@uniformdev/context';
import { BoostInclusions, OrderBy } from '../types';

export const buildOrderByQuery = (orderBy: OrderBy) => {
  return `${orderBy.field}_${orderBy.direction}`;
};

export const getEnrichmentKeysWithScore = (boostEnrichment: string, scores: ScoreVector): string[] => {
  return Object.entries(scores)
    .filter(([key, score]) => key.startsWith(boostEnrichment) && score > 0)
    .map(([key]) => key);
};

export const getOrderByClause = (userType: BoostInclusions, maxBoosts: number) => {
  if (!Object.keys(userType).length) {
    return undefined;
  }
  const orderFields = Object.entries(userType)
    .map(([category, data]) => {
      const { fieldKey } = getEnrichmentAndFieldKey(category);
      if (!fieldKey) {
        return '';
      }
      return `fields.${fieldKey}.slug:${data.value}:${data.score}`;
    })
    .filter(Boolean);

  if (orderFields.length === 0) {
    return undefined;
  }

  return `boost|${orderFields.slice(0, maxBoosts).join('|')}`;
};

export const getEnrichmentAndFieldKey = (enrichment: string) => {
  const [enrichmentKey = '', fieldKey = ''] = enrichment.split(',') || [];
  return { enrichmentKey: enrichmentKey.trim(), fieldKey: fieldKey.trim() };
};

export const getMaxEnrichmentKey = (boostEnrichment: string, scores: Record<string, number>): string | null => {
  return Object.entries(scores).reduce<{ key: string | null; score: number }>(
    (acc, [key, score]) => {
      if (key.startsWith(boostEnrichment)) {
        return score > acc.score ? { key, score } : acc;
      }

      return acc;
    },
    { key: null, score: -Infinity }
  ).key;
};

export const getOrderByClause = (userType: Record<string, string>) => {
  const orderFields = Object.entries(userType).map(([category, value]) => {
    return `fields.${category}.slug:${value}:3`;
  });

  return `boost|${orderFields.join('|')}`;
};

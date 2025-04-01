export const getMaxEnrichmentKey = (
  boostEnrichment: string,
  scores: Record<string, number>,
  enrichmentKeys: string[]
): string | null =>
  enrichmentKeys.reduce<{ key: string | null; score: number }>(
    (acc, key) => {
      const score = scores[`${boostEnrichment}_${key}`] ?? 0;
      return score > acc.score ? { key, score } : acc;
    },
    { key: null, score: -Infinity }
  ).key;

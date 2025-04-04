import { cookies } from 'next/headers';
import { ContentClient, flattenValues } from '@uniformdev/canvas';
import { CookieTransitionDataStore } from '@uniformdev/context';
import { transformEntry } from '@/modules/cart/utils';
import { getEnrichmentAndFieldKey, getMaxEnrichmentKey, getOrderByClause } from './utils';
import { Product } from '../cart/types';

type Args = {
  boostEnrichments: string[];
  maxRecommendations: number;
  entryType: string;
};

export async function getProductRecommendations({
  boostEnrichments,
  maxRecommendations,
  entryType,
}: Args): Promise<Product[]> {
  if (!process.env.UNIFORM_PROJECT_ID || !process.env.UNIFORM_API_KEY) {
    throw new Error('Missing required environment variables');
  }

  const cookieStore = await cookies();

  const scoreCookie = cookieStore.get('ufvd')?.value;

  const transitionStore = new CookieTransitionDataStore({
    serverCookieValue: scoreCookie,
    experimental_quirksEnabled: true,
  });

  const scores = transitionStore.data?.scores;

  const boostInclusions = boostEnrichments.reduce<Record<string, string>>((acc, enrichment) => {
    const { enrichmentKey } = getEnrichmentAndFieldKey(enrichment);
    const maxEnrichmentKey = getMaxEnrichmentKey(enrichmentKey, scores ?? {});
    const [, boostValue] = maxEnrichmentKey?.split('_') ?? [];

    if (maxEnrichmentKey) {
      return { ...acc, [enrichment]: boostValue };
    }
    return acc;
  }, {});

  const contentClient = new ContentClient({
    projectId: process.env.UNIFORM_PROJECT_ID,
    apiKey: process.env.UNIFORM_API_KEY,
    apiHost: process.env.UNIFORM_CLI_BASE_URL!,
    edgeApiHost: process.env.UNIFORM_CLI_BASE_EDGE_URL!,
  });

  const orderBy = getOrderByClause(boostInclusions);

  const { entries } = await contentClient.getEntries({
    filters: { type: { eq: entryType } },
    limit: maxRecommendations ?? 30,
    orderBy: [orderBy],
    locale: 'en',
  });

  return entries
    .map(entryResponse => {
      const flattened = flattenValues(entryResponse.entry);
      if (!flattened) return null;

      return {
        ...transformEntry(flattened),
        slug: entryResponse.entry?._slug,
      };
    })
    .filter(Boolean) as Product[];
}

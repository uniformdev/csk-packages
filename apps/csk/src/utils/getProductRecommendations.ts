import { cookies } from 'next/headers';
import { ContentClient } from '@uniformdev/canvas';
import locales from '@/i18n/locales.json';
import { Product } from '@/types';
import { getEnrichmentBoostedOrderBy } from './getEnrichmentBoostedOrderBy';
import { mapUniformContentEntryFields } from './mappers';

type Args = {
  boostEnrichments: string[];
  maxRecommendations: number;
  entryType: string;
  isPreview?: boolean;
};

export async function getProductRecommendations({
  boostEnrichments,
  maxRecommendations,
  entryType,
  isPreview = false,
}: Args): Promise<Product[]> {
  if (!process.env.UNIFORM_PROJECT_ID || !process.env.UNIFORM_API_KEY) {
    throw new Error('Missing required environment variables');
  }
  const cookieStore = await cookies();
  const locale = cookieStore.get('NEXT_LOCALE')?.value || locales.defaultLocale;

  const orderBy = await getEnrichmentBoostedOrderBy(boostEnrichments);
  if (!isPreview && !orderBy) {
    return [];
  }

  const contentClient = new ContentClient({
    projectId: process.env.UNIFORM_PROJECT_ID,
    apiKey: process.env.UNIFORM_API_KEY,
    apiHost: process.env.UNIFORM_CLI_BASE_URL!,
    edgeApiHost: process.env.UNIFORM_CLI_BASE_EDGE_URL!,
  });

  // Typesense boost only works when there's a search query to boost relevance
  const { entries } = await contentClient.getEntries({
    filters: { type: { eq: entryType } },
    orderBy: orderBy ? [orderBy] : undefined,
    locale: locale,
    limit: maxRecommendations,
  });

  return entries.map(entry => mapUniformContentEntryFields<Product>(entry.entry));
}

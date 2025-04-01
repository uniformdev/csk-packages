import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { ContentClient, flattenValues } from '@uniformdev/canvas';
import { transformEntry } from '@/modules/cart/utils';
import { BOOST_ENRICHMENT_VALUES, ORDER_BY_CLAUSES, PERSONALIZATION_SUPPORTED_ENTRY_TYPES } from './constants';

import { PersonalizationSupportedEntryType, ProductBoostEnrichment } from './types';

const requestSchema = z.object({
  userType: z.string(),
  boostEnrichment: z.enum(BOOST_ENRICHMENT_VALUES),
  maxProducts: z.number().optional(),
  entryType: z.enum(PERSONALIZATION_SUPPORTED_ENTRY_TYPES),
});

const getOrderByClause = (
  userType: string,
  boostEnrichment: ProductBoostEnrichment,
  entryType: PersonalizationSupportedEntryType
) => {
  return ORDER_BY_CLAUSES[entryType][boostEnrichment][userType];
};

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validationResult = requestSchema.safeParse(body);

    if (!validationResult.success) {
      return NextResponse.json(
        { error: 'Invalid request body', details: validationResult.error.issues },
        { status: 400 }
      );
    }

    const { userType, boostEnrichment, maxProducts, entryType } = validationResult.data;

    if (!process.env.UNIFORM_PROJECT_ID || !process.env.UNIFORM_API_KEY) {
      console.error('Missing required environment variables');
      return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
    }

    const contentClient = new ContentClient({
      projectId: process.env.UNIFORM_PROJECT_ID,
      apiKey: process.env.UNIFORM_API_KEY,
    });

    const orderBy = getOrderByClause(userType, boostEnrichment, entryType);

    const { entries } = await contentClient.getEntries({
      filters: { type: { eq: entryType } },
      limit: maxProducts ?? 30,
      orderBy: [orderBy],
      locale: 'en',
    });

    const products = entries.map(entryResponse => {
      const flattened = flattenValues(entryResponse.entry);

      if (!flattened) return null;

      return {
        ...transformEntry(flattened),
        slug: entryResponse.entry?._slug,
      };
    });

    return NextResponse.json(products);
  } catch (error) {
    console.error('Error in API route:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

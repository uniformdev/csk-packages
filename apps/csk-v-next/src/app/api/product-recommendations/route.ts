import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { ContentClient, flattenValues } from '@uniformdev/canvas';
import { ORDER_BY_CLAUSES, ProductBoostEnrichment } from '@/constants/programmaticPersonalization';
import { transformEntry } from '@/modules/cart/utils';

const requestSchema = z.object({
  userType: z.string(),
  boostEnrichment: z.string(),
  maxProducts: z.number().optional(),
});

function getOrderByClause(userType: string, boostEnrichment: ProductBoostEnrichment): string {
  return ORDER_BY_CLAUSES['product'][boostEnrichment][userType];
}

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

    const { userType, boostEnrichment, maxProducts } = validationResult.data;

    if (!process.env.UNIFORM_PROJECT_ID || !process.env.UNIFORM_API_KEY) {
      console.error('Missing required environment variables');
      return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
    }

    const contentClient = new ContentClient({
      projectId: process.env.UNIFORM_PROJECT_ID,
      apiKey: process.env.UNIFORM_API_KEY,
    });

    const orderBy = getOrderByClause(userType, boostEnrichment as ProductBoostEnrichment);

    const { entries } = await contentClient.getEntries({
      filters: { type: { eq: 'product' } },
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

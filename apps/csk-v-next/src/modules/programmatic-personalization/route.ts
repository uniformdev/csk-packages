import { NextRequest, NextResponse } from 'next/server';
import { ContentClient, flattenValues } from '@uniformdev/canvas';
import { transformEntry } from '@/modules/cart/utils';
import { getOrderByClause } from './utils';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const { boostInclusions, maxProducts, entryType } = body;

    if (!process.env.UNIFORM_PROJECT_ID || !process.env.UNIFORM_API_KEY) {
      console.error('Missing required environment variables');
      return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
    }

    const contentClient = new ContentClient({
      projectId: process.env.UNIFORM_PROJECT_ID,
      apiKey: process.env.UNIFORM_API_KEY,
      apiHost: process.env.UNIFORM_CLI_BASE_URL!,
      edgeApiHost: process.env.UNIFORM_CLI_BASE_EDGE_URL!,
    });

    const orderBy = getOrderByClause(boostInclusions);

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

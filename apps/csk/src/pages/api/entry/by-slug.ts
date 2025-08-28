import { NextApiRequest, NextApiResponse } from 'next';
import { ContentClient } from '@uniformdev/canvas';
import { Product } from '@/types';

import { mapUniformContentEntryFields } from '@/utils/mappers';

export default async function handler(req: NextApiRequest, res: NextApiResponse<Product[] | { error: string }>) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { productSlugs } = req.query;

  // Handle both single string and array of strings
  let slugsArray: string[] = [];
  if (productSlugs) {
    if (Array.isArray(productSlugs)) {
      slugsArray = productSlugs;
    } else {
      slugsArray = [productSlugs];
    }
  }

  if (slugsArray.length === 0) {
    return res.status(200).json([]);
  }

  try {
    const contentClient = new ContentClient({
      apiKey: process.env.UNIFORM_API_KEY,
      projectId: process.env.UNIFORM_PROJECT_ID,
      apiHost: process.env.UNIFORM_CLI_BASE_URL!,
      edgeApiHost: process.env.UNIFORM_CLI_BASE_EDGE_URL!,
    });

    const { entries } = await contentClient.getEntries({
      filters: {
        slug: {
          in: slugsArray as string & string[],
        },
      },
      locale: 'en',
    });

    const products = entries.map(item => mapUniformContentEntryFields<Product>(item.entry));

    return res.status(200).json(products);
  } catch (error) {
    console.error('Error fetching entries by slug:', error);
    return res.status(500).json({ error: 'Failed to fetch entries' });
  }
}

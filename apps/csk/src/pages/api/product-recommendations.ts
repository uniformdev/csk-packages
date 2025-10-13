import { NextApiRequest, NextApiResponse } from 'next';
import { Product } from '@/types';
import { getProductRecommendations } from '@/utils/getProductRecommendations';

export default async function handler(req: NextApiRequest, res: NextApiResponse<Product[] | { error: string }>) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { boostEnrichments, maxRecommendations = '3', entryType = 'product' } = req.query;

    let parsedBoostEnrichments: string[] = [];
    if (boostEnrichments) {
      if (Array.isArray(boostEnrichments)) {
        parsedBoostEnrichments = boostEnrichments;
      } else {
        try {
          parsedBoostEnrichments = JSON.parse(boostEnrichments);
        } catch {
          parsedBoostEnrichments = boostEnrichments.split(',').filter(Boolean);
        }
      }
    }

    const products = await getProductRecommendations({
      boostEnrichments: parsedBoostEnrichments,
      maxRecommendations: parseInt(maxRecommendations as string),
      entryType: entryType as string,
      scoreCookie: req.cookies.ufvd ?? '',
    });

    res.status(200).json(products);
  } catch (error) {
    console.error('Error fetching product recommendations:', error);
    res.status(500).json({ error: 'Failed to fetch product recommendations' });
  }
}

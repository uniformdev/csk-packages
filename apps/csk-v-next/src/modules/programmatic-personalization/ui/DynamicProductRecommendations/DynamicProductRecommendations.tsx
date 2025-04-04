'use client';

import { FC, useEffect, useState } from 'react';
import { useScores } from '@uniformdev/canvas-next-rsc-client';
import { Flex as CSKFlex, Grid } from '@uniformdev/csk-components/components/ui';
import { ProductCard } from '@/components/custom-ui/ProductCard';
import { Product } from '@/modules/cart/types';
import { ProductCardSkeleton } from '@/modules/favorites';
import { getEnrichmentAndFieldKey, getMaxEnrichmentKey } from '@/modules/programmatic-personalization';
import { DynamicRecommendationsProps } from '.';
import { ProductBoostEnrichment } from '../../types';

type BoostInclusions = Partial<Record<ProductBoostEnrichment, string>>;

const DynamicProductRecommendations: FC<DynamicRecommendationsProps> = ({
  title,
  backgroundColor,
  spacing,
  fluidContent,
  fullHeight,
  border,
  boostEnrichments,
  maxRecommendations = '3',
}) => {
  const scores = useScores();

  const [isLoading, setIsLoading] = useState(true);
  const [boostInclusions, setBoostInclusions] = useState<BoostInclusions>({});
  const [products, setProducts] = useState<Product[]>([]);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (!scores || !boostEnrichments?.length) return;

    const boostInclusions = boostEnrichments.reduce<Record<string, string>>((acc, enrichment) => {
      const { enrichmentKey } = getEnrichmentAndFieldKey(enrichment);

      const maxEnrichmentKey = getMaxEnrichmentKey(enrichmentKey, scores);

      const [, boostValue] = maxEnrichmentKey?.split('_') ?? [];

      if (maxEnrichmentKey) {
        return { ...acc, [enrichment]: boostValue };
      }

      return acc;
    }, {});

    setBoostInclusions(boostInclusions);
  }, [boostEnrichments, scores]);

  useEffect(() => {
    const fetchData = async () => {
      setIsError(false);
      setIsLoading(true);
      try {
        const response = await fetch('/api/programmatic-personalization', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            boostInclusions,
            maxRecommendations: parseInt(maxRecommendations),
            entryType: 'product',
          }),
        });

        if (!response.ok) {
          setIsError(true);
          return;
        }

        const result = await response.json();

        setProducts(result);
      } catch (error) {
        console.error('Error fetching recommendations:', error);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [boostInclusions, boostEnrichments, maxRecommendations]);

  if (isError) {
    return (
      <CSKFlex
        justifyContent="center"
        direction="col"
        alignItems="center"
        className="text-center"
        gap="6"
        {...{ backgroundColor, spacing, border, fluidContent, fullHeight }}
      >
        <h2 className="text-2xl font-semibold text-red-600">Something went wrong</h2>
        <p className="text-base text-gray-500">
          We couldn’t fetch your recommendations. Please reload the page or contact support if the issue persists.
        </p>
      </CSKFlex>
    );
  }

  return (
    <CSKFlex
      justifyContent="center"
      direction="col"
      alignItems="center"
      gap="16"
      {...{ backgroundColor, spacing, border, fluidContent, fullHeight }}
    >
      {title}

      <Grid columnsCount="3" gapY="8" gapX="8">
        {isLoading
          ? Array.from({ length: parseInt(maxRecommendations) }, () => 0).map((_, index) => (
              <ProductCardSkeleton key={index} />
            ))
          : products.map(product => {
              const { price = 0, currency = '$' } = product?.variants?.[0] ?? {};
              return (
                <ProductCard
                  key={product.slug}
                  price={`${currency}${price}`}
                  title={product.title}
                  image={product.primaryImage?.[0]?.url}
                  slug={product.slug}
                  link={`/products/${product.slug}`}
                  textColor={'primary'}
                />
              );
            })}
      </Grid>
    </CSKFlex>
  );
};

export default DynamicProductRecommendations;

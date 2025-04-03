'use client';

import { FC, useEffect, useState } from 'react';
import { useScores } from '@uniformdev/canvas-next-rsc-client';
import { Flex as CSKFlex, Grid } from '@uniformdev/csk-components/components/ui';
import { cn } from '@uniformdev/csk-components/utils/styling';
import { ProductCard } from '@/components/custom-ui/ProductCard';
import { Product } from '@/modules/cart/types';
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
  loadingIndicatorColor,
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
      {isLoading ? (
        <div className="text-center">
          <svg
            className={cn('inline size-16 animate-spin', {
              [`text-${loadingIndicatorColor}`]: loadingIndicatorColor,
            })}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          <h2 className="mt-4 text-xl font-semibold text-gray-700">Loading awesome stuff...</h2>
          <p className="mt-2 text-gray-500">Get ready for some great recommendations!</p>
        </div>
      ) : (
        <Grid columnsCount="3" gapY="8" gapX="8">
          {products.map(product => {
            const { price, currency } = product?.variants[0];
            return (
              <ProductCard
                key={product.slug}
                price={`${currency}${price}`}
                title={product.title}
                image={product.primaryImage[0].url}
                slug={product.slug}
                link={`/products/${product.slug}`}
                textColor={'primary'}
              />
            );
          })}
        </Grid>
      )}
    </CSKFlex>
  );
};

export default DynamicProductRecommendations;

'use client';

import { FC, useEffect, useState } from 'react';
import { ComponentProps, UniformSlot } from '@uniformdev/canvas-next-rsc/component';
import { Flex as CSKFlex, ContainerProps as CSKContainerProps, Grid } from '@uniformdev/csk-components/components/ui';
import { cn } from '@uniformdev/csk-components/utils/styling';
import { BOOST_ENRICHMENT_BY_TYPE, EVERYONE, ProductBoostEnrichment } from '@/constants/programmaticPersonalization';
import { Product } from '@/modules/cart/types';
import { ProductCard } from '../custom-ui/ProductCard';

type DynamicRecommendationsParameters = CSKContainerProps & {
  loadingIndicatorColor?: string;
  boostEnrichment: ProductBoostEnrichment;
};

enum DynamicRecommendationsSlots {
  DynamicRecommendationsTitle = 'dynamicRecommendationsTitle',
}

type DynamicRecommendationsProps = ComponentProps<DynamicRecommendationsParameters, DynamicRecommendationsSlots>;

const getMaxEnrichmentKey = (
  boostEnrichment: string,
  scores: Record<string, number>,
  enrichmentKeys: string[]
): string | null => {
  return enrichmentKeys.reduce<{ key: string | null; score: number }>(
    (acc, key) => {
      const score = scores[`${boostEnrichment}_${key}`] ?? 0;
      return score > acc.score ? { key, score } : acc;
    },
    { key: null, score: -Infinity }
  ).key;
};

const DynamicProductRecommendations: FC<DynamicRecommendationsProps> = ({
  component,
  context,
  slots,
  backgroundColor,
  spacing,
  fluidContent,
  fullHeight,
  border,
  loadingIndicatorColor,
  boostEnrichment,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [userType, setUserType] = useState<string | undefined>(undefined);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    try {
      const rawData = typeof window !== 'undefined' ? localStorage.getItem('ufvisitor') : null;

      if (rawData) {
        const parsedData = JSON.parse(rawData);
        const scores = parsedData?.visitorData?.scores || {};

        const enrichmentKeys = BOOST_ENRICHMENT_BY_TYPE['product'][boostEnrichment];

        const maxEnrichmentKey = getMaxEnrichmentKey(boostEnrichment, scores, enrichmentKeys);

        setUserType(maxEnrichmentKey ?? EVERYONE);
      } else {
        // If no local storage data is found, fallback to 'everyone'
        setUserType(EVERYONE);
      }
    } catch (error) {
      console.error('Error parsing ufvisitor data:', error);
      setUserType(EVERYONE);
    }
  }, [boostEnrichment]);

  // Fetch data only after we have a stable userType
  useEffect(() => {
    const fetchData = async () => {
      if (!userType) return;

      setIsLoading(true);
      try {
        const response = await fetch('/api/product-recommendations', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userType, boostEnrichment, maxProducts: 3 }),
        });

        if (!response.ok) {
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }

        const result = await response.json();

        setProducts(result);
      } catch (error) {
        console.error('Error fetching recommendations:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [userType, boostEnrichment]);

  return (
    <CSKFlex
      justifyContent="center"
      direction="col"
      alignItems="center"
      gap="16"
      {...{ backgroundColor, spacing, border, fluidContent, fullHeight }}
    >
      <UniformSlot data={component} context={context} slot={slots.dynamicRecommendationsTitle} />

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
        <Grid columnsCount={'3'} gapY="8" gapX="8">
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
                addToFavoritesIcon={''}
                removeFromFavoritesIcon={''}
              />
            );
          })}
        </Grid>
      )}
    </CSKFlex>
  );
};

export default DynamicProductRecommendations;

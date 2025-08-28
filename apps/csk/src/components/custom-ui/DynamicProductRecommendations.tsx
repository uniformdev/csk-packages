import { FC, useEffect, useState } from 'react';
import { ReactElement } from 'react';
import { Flex as CSKFlex, Grid } from '@uniformdev/csk-components/components/ui';
import { ContainerProps as CSKContainerProps } from '@uniformdev/csk-components/components/ui';
import { Product } from '@/types';
import ProductCard, { ProductCardSkeleton } from './ProductCard';

export type DynamicRecommendationsProps = Omit<CSKContainerProps, 'title'> & {
  loadingIndicatorColor?: string;
  // Each entry should be in the format: "enrichmentKey,fieldKey".
  // This allows us to map an enrichment to its corresponding product field.
  boostEnrichments?: string[];
  title?: ReactElement;
  maxRecommendations?: string;
};

const DynamicProductRecommendations: FC<DynamicRecommendationsProps> = ({
  title,
  backgroundColor,
  spacing,
  fluidContent,
  height,
  border,
  boostEnrichments = [],
  maxRecommendations = '3',
}) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const queryParams = new URLSearchParams({
          maxRecommendations,
          entryType: 'product',
        });

        if (boostEnrichments.length > 0) {
          queryParams.append('boostEnrichments', JSON.stringify(boostEnrichments));
        }

        const response = await fetch(`/api/product-recommendations?${queryParams}`);

        if (!response.ok) {
          throw new Error('Failed to fetch product recommendations');
        }

        const products: Product[] = await response.json();
        setProducts(products);
      } catch (error) {
        console.error('Error fetching product recommendations:', error);
        setProducts([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [boostEnrichments, maxRecommendations]);

  return (
    <CSKFlex
      justifyContent="center"
      direction="col"
      alignItems="center"
      gap="16"
      {...{ backgroundColor, spacing, border, fluidContent, height }}
    >
      {title}

      <div className="w-full">
        <Grid
          columnsCount={{
            desktop: '3',
            tablet: '2',
            mobile: '1',
          }}
          gapY="8"
          gapX="8"
          fluidContent
        >
          {!products.length || isLoading
            ? Array.from({ length: parseInt(maxRecommendations) }, () => 0).map((_, index) => (
                <ProductCardSkeleton key={index} />
              ))
            : products.map(product => {
                const { price = 0, currency = 'USD' } = product?.variants?.[0] ?? {};
                return (
                  <ProductCard
                    key={product.slug}
                    price={price}
                    currency={currency}
                    title={product.title}
                    image={product.primaryImage?.[0]?.url}
                    slug={product.slug}
                    link={`/products/${product.slug}`}
                    textColor={'primary'}
                  />
                );
              })}
        </Grid>
      </div>
    </CSKFlex>
  );
};

export default DynamicProductRecommendations;

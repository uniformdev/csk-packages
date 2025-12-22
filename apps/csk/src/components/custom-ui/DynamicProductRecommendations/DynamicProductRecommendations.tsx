import { FC } from 'react';
import { Flex as CSKFlex, Grid } from '@uniformdev/csk-components/components/ui';
import { getProductRecommendations } from '@/utils/getProductRecommendations';
import { DynamicRecommendationsProps } from '.';
import ProductCard from '../ProductCard';
import { draftMode } from 'next/headers';

const DynamicProductRecommendations: FC<DynamicRecommendationsProps> = async props => {
  const {
    title,
    backgroundColor,
    spacing,
    fluidContent,
    border,
    height,
    boostEnrichments = [],
    maxRecommendations = '3',
  } = props;
  const { isEnabled } = await draftMode();
  const products = boostEnrichments.length
    ? await getProductRecommendations({
        boostEnrichments,
        maxRecommendations: parseInt(maxRecommendations),
        entryType: 'product',
        isPreview: isEnabled,
      })
    : [];

  return (
    <CSKFlex
      justifyContent="center"
      direction="col"
      alignItems="center"
      gap="16"
      {...{ backgroundColor, spacing, border, fluidContent, height }}
    >
      {title}
      {!isEnabled && !products.length && <p>Insufficient behavioral profile to return recommendations.</p>}
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
        {products?.length
          ? products.map(product => {
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
            })
          : null}
      </Grid>
    </CSKFlex>
  );
};

export default DynamicProductRecommendations;

'use server';

import { createStreamableUI } from 'ai/rsc';
import { CANVAS_DRAFT_STATE, type RootComponentInstance } from '@uniformdev/canvas';
import { UniformComposition } from '@uniformdev/canvas-next-rsc-v2';
import { Flex as CSKFlex, Grid } from '@uniformdev/csk-components/components/ui';

import { componentResolver } from '@/components';
import ProductCard from '@/components/custom-ui/ProductCard';
import {
  getCartFromCanvas,
  getContextRecommendationsFromCanvas,
  getRecommendProductsFromCanvas,
  getRecommendProductsWithBoost,
  getRelatedProductsFromCanvas,
} from '../utils/canvas';

export const renderCartComposition = async () => {
  const { composition, code } = await getCartFromCanvas();
  return renderComposition(composition, code);
};

export const renderRelatedRecommendationsComposition = async (slugs: string[]) => {
  const { composition, code } = await getRelatedProductsFromCanvas(slugs);
  return renderComposition(composition, code);
};

export const renderUserRecommendationsComposition = async ({ scoreCookie }: { scoreCookie: string | undefined }) => {
  const { composition, code } = await getRecommendProductsFromCanvas({ scoreCookie });
  return renderComposition(composition, code);
};

export const renderContextRecommendationsComposition = async (slugs: string[]) => {
  const { composition, code } = await getContextRecommendationsFromCanvas(slugs);
  return renderComposition(composition, code);
};

/**
 * Renders product recommendations using the boost-based approach.
 * Uses the same UI components as DynamicProductRecommendations for consistent display.
 */
export const renderBoostRecommendations = async () => {
  const { products } = await getRecommendProductsWithBoost();
  const compositionUI = createStreamableUI();

  compositionUI.update(
    <CSKFlex justifyContent="center" direction="col" alignItems="center" gap="16">
      {!products.length && <p>No recommendations available based on your profile.</p>}
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
        {products.map(product => {
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
    </CSKFlex>
  );
  compositionUI.done();

  return compositionUI.value;
};

const renderComposition = async (composition: RootComponentInstance | undefined, code: string | undefined) => {
  const compositionUI = createStreamableUI();

  compositionUI.update(
    composition && code ? (
      <UniformComposition
        pageState={{
          compositionState: CANVAS_DRAFT_STATE,
          routePath: '',
          keys: undefined,
          components: {},
          releaseId: undefined,
          rules: undefined,
          defaultConsent: undefined,
          previewMode: undefined,
        }}
        route={{
          type: 'composition',
          matchedRoute: '',
          compositionApiResponse: {
            composition,
            projectId: '',
            state: 0,
            created: '',
            modified: '',
            pattern: false,
          },
        }}
        resolveComponent={componentResolver}
        code={code}
      />
    ) : null
  );
  compositionUI.done();

  return compositionUI.value;
};

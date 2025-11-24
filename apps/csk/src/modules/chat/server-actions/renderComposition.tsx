'use server';

import { createStreamableUI } from 'ai/rsc';
import { CANVAS_DRAFT_STATE, type RootComponentInstance } from '@uniformdev/canvas';
import { UniformComposition } from '@uniformdev/canvas-next-rsc-v2';

import { componentResolver } from '@/components';
import {
  getCartFromCanvas,
  getContextRecommendationsFromCanvas,
  getRecommendProductsFromCanvas,
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

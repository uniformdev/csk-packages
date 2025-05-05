'use server';

import { createStreamableUI } from 'ai/rsc';
import type { RootComponentInstance } from '@uniformdev/canvas';
import { UniformComposition } from '@uniformdev/canvas-next-rsc';

import { componentResolver } from '@/components';
import { getCartFromCanvas, getRecommendProductsFromCanvas, getRelatedProductsFromCanvas } from '../utils/canvas';

export const renderCartComposition = async () => {
  const { composition } = await getCartFromCanvas();
  return renderComposition(composition);
};

export const renderRelatedRecommendationsComposition = async (slugs: string[]) => {
  const { composition } = await getRelatedProductsFromCanvas(slugs);
  return renderComposition(composition);
};

export const renderUserRecommendationsComposition = async ({ scoreCookie }: { scoreCookie: string | undefined }) => {
  const { composition } = await getRecommendProductsFromCanvas({ scoreCookie });
  return renderComposition(composition);
};

const renderComposition = async (composition: RootComponentInstance | undefined) => {
  const compositionUI = createStreamableUI();

  compositionUI.update(
    composition ? (
      <UniformComposition
        params={Promise.resolve({ path: '' })}
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
        mode="server"
      />
    ) : null
  );
  compositionUI.done();

  return compositionUI.value;
};

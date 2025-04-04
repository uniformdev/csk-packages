'use server';

import { createStreamableUI } from 'ai/rsc';
import { RootComponentInstance } from '@uniformdev/canvas';
import { UniformComposition } from '@uniformdev/canvas-next-rsc';
import { emptyPlaceholderResolver } from '@uniformdev/csk-components/components/canvas/emptyPlaceholders';
import { componentResolver } from '@/components';
import { getCartPattern, getInterestRecommendations, getRelatedRecommendations } from '../utils/canvas';

export const getInterestRecommendationsComposition = async ({ scoreCookie }: { scoreCookie: string | undefined }) => {
  const { composition } = await getInterestRecommendations({ scoreCookie });
  return renderComposition(composition);
};

export const getCartComposition = async () => {
  const { composition } = await getCartPattern();
  return renderComposition(composition);
};

export const getRelatedRecommendationsComposition = async (slugs: string[]) => {
  const { composition } = await getRelatedRecommendations(slugs);
  return renderComposition(composition);
};

const renderComposition = async (composition?: RootComponentInstance) => {
  const compositionUI = createStreamableUI();
  compositionUI.update(
    !composition ? null : (
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
        resolveEmptyPlaceholder={emptyPlaceholderResolver}
      />
    )
  );
  compositionUI.done();

  return compositionUI.value;
};

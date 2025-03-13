'use server';

import { createStreamableUI } from 'ai/rsc';
import { ResolvedRouteGetResponse, RootComponentInstance } from '@uniformdev/canvas';
import { UniformComposition } from '@uniformdev/canvas-next-rsc';
import { emptyPlaceholderResolver } from '@uniformdev/csk-components/components/canvas/emptyPlaceholders';
import { componentResolver } from '@/components';

const getRoute = (composition: RootComponentInstance): ResolvedRouteGetResponse => ({
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
});

export async function productRecommendations(composition?: RootComponentInstance) {
  const compositionUI = createStreamableUI();

  compositionUI.update(
    !composition ? null : (
      <UniformComposition
        params={Promise.resolve({ path: '' })}
        route={getRoute(composition)}
        resolveComponent={componentResolver}
        mode="server"
        resolveEmptyPlaceholder={emptyPlaceholderResolver}
      />
    )
  );
  compositionUI.done();

  return compositionUI.value;
}

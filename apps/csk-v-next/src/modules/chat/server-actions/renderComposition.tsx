'use server';

import { createStreamableUI } from 'ai/rsc';
import { RootComponentInstance } from '@uniformdev/canvas';
import { UniformComposition } from '@uniformdev/canvas-next-rsc';
import { emptyPlaceholderResolver } from '@uniformdev/csk-components/components/canvas/emptyPlaceholders';
import { componentResolver } from '@/components';

export async function renderComposition(composition?: RootComponentInstance) {
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
}

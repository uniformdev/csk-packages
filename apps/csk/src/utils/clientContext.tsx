'use client';

import { useRouter } from 'next/navigation';
import {
  ClientContextComponent,
  createClientUniformContext,
  useInitUniformContext,
} from '@uniformdev/canvas-next-rsc-v2/component';
import { ContextPlugin, enableContextDevTools, enableUniformInsights } from '@uniformdev/context';

export const UniformClientContext: ClientContextComponent = ({ manifest }) => {
  const router = useRouter();

  useInitUniformContext(() => {
    const plugins: ContextPlugin[] = [];

    plugins.push(
      enableContextDevTools({
        onAfterMessageReceived: () => {
          router.refresh();
        },
      })
    );

    plugins.push(
      enableUniformInsights({
        endpoint: {
          type: 'proxy',
          path: '/api/analytics',
        },
      })
    );

    return createClientUniformContext({
      manifest,
      plugins,
      defaultConsent: true,
    });
  });

  return null;
};

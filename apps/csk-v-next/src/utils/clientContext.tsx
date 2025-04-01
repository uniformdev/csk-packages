'use client';

import { useRouter } from 'next/navigation';
import {
  ClientContextComponent,
  createClientUniformContext,
  useInitUniformContext,
} from '@uniformdev/canvas-next-rsc/component';
import { ContextPlugin, enableContextDevTools } from '@uniformdev/context';
import { enableGoogleGtagAnalytics } from '@uniformdev/context-gtag';

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

    plugins.push(enableGoogleGtagAnalytics());

    return createClientUniformContext({
      manifest,
      plugins,
      defaultConsent: true,
      experimental_quirksEnabled: true,
    });
  });

  return null;
};

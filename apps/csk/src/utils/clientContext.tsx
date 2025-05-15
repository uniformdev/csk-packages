'use client';

import { useRouter } from 'next/navigation';
import {
  ClientContextComponent,
  createClientUniformContext,
  useInitUniformContext,
} from '@uniformdev/canvas-next-rsc/component';
import {
  ContextPlugin,
  enableContextDevTools,
  //? if (uniformInsights) {
  enableUniformInsights,
  //? }
} from '@uniformdev/context';
//? if (ga) {
import { enableGoogleGtagAnalytics } from '@uniformdev/context-gtag';
//? }

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

    //? if (ga) {
    plugins.push(enableGoogleGtagAnalytics() as ContextPlugin);
    //? }

    //? if (uniformInsights) {
    plugins.push(
      enableUniformInsights({
        endpoint: {
          type: 'proxy',
          path: '/api/analytics',
        },
      })
    );
    //? }

    return createClientUniformContext({
      manifest,
      plugins,
      defaultConsent: true,
    });
  });

  return null;
};

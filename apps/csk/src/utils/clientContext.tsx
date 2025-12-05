'use client';

import { useRouter } from 'next/navigation';
import {
  ClientContextComponent,
  createClientUniformContext,
  useInitUniformContext,
} from '@uniformdev/canvas-next-rsc-v2/component';
import { ContextPlugin, enableContextDevTools } from '@uniformdev/context';
//? if (ga) {
import { enableGoogleGtagAnalytics } from '@uniformdev/context-gtag';
//? }
//? if (uniformInsights) {
import { enableUniformInsights } from '@uniformdev/insights';
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
    if (
      process.env.NEXT_PUBLIC_UNIFORM_INSIGHTS_API_KEY &&
      process.env.NEXT_PUBLIC_UNIFORM_INSIGHTS_API_URL &&
      process.env.NEXT_PUBLIC_UNIFORM_PROJECT_ID
    ) {
      plugins.push(
        enableUniformInsights({
          endpoint: {
            type: 'api',
            projectId: process.env.NEXT_PUBLIC_UNIFORM_PROJECT_ID!,
            apiKey: process.env.NEXT_PUBLIC_UNIFORM_INSIGHTS_API_KEY!,
            host: process.env.NEXT_PUBLIC_UNIFORM_INSIGHTS_API_URL!,
          },
        })
      );
    }
    //? }

    return createClientUniformContext({
      manifest,
      plugins,
      defaultConsent: true,
    });
  });

  return null;
};

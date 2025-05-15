'use server';

import { cookies } from 'next/headers';
import { LinkParamValue } from '@uniformdev/canvas';
import { UniformComposition } from '@uniformdev/canvas-next-rsc';
import { componentResolver } from '@/components';
import locales from '@/i18n/locales.json';
import routeClient from '@/utils/routeClient';

export const getComposition = async (compositionNode: LinkParamValue) => {
  if (!compositionNode?.path) return;

  const cookieStore = await cookies();
  const locale = cookieStore.get('NEXT_LOCALE')?.value || locales.defaultLocale;
  const route = await routeClient.getRoute({
    path: compositionNode?.path,
    locale,
  });

  if (
    'compositionApiResponse' in route &&
    route?.compositionApiResponse &&
    'composition' in route.compositionApiResponse
  ) {
    return (
      <UniformComposition
        params={Promise.resolve({ path: '' })}
        route={{
          type: 'composition',
          matchedRoute: '',
          compositionApiResponse: {
            composition: route.compositionApiResponse.composition,
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
    );
  }

  return null;
};

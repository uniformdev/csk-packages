'use server';

import { cookies } from 'next/headers';
import { LinkParamValue } from '@uniformdev/canvas';
import { UniformComposition } from '@uniformdev/canvas-next-rsc-v2';
import { componentResolver } from '@/components';
import locales from '@/i18n/locales.json';
import resolveRouteFromRoutePath from '@/utils/resolveRouteFromRoutePath';

export const getComposition = async (compositionNode: LinkParamValue) => {
  if (!compositionNode?.path) {
    return null;
  }

  const cookieStore = await cookies();
  const locale = cookieStore.get('NEXT_LOCALE')?.value || locales.defaultLocale;

  const result = await resolveRouteFromRoutePath(compositionNode.path?.replace(':locale', locale));

  if (!result.route) {
    return null;
  }

  return (
    <UniformComposition
      {...result}
      route={{
        type: 'composition',
        matchedRoute: '',
        compositionApiResponse: {
          composition: result.route.compositionApiResponse.composition,
          projectId: '',
          state: 0,
          created: '',
          modified: '',
          pattern: false,
        },
      }}
      resolveComponent={componentResolver}
    />
  );
};

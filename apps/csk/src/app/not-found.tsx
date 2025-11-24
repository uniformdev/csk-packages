import { notFound } from 'next/navigation';
import { UniformComposition } from '@uniformdev/canvas-next-rsc-v2';
import { emptyPlaceholderResolver } from '@uniformdev/csk-components/components/canvas/emptyPlaceholders';

import { DesignExtensionsProvider } from '@uniformdev/design-extensions-tools/components/providers/server';
import { componentResolver } from '@/components';
import locales from '@/i18n/locales.json';
import resolveRouteFromRoutePath from '@/utils/resolveRouteFromRoutePath';

const ROUTE_PATH = `/${locales.defaultLocale}/not-found`;

export default async function NotFound() {
  const result = await resolveRouteFromRoutePath(ROUTE_PATH);

  if (!result.route) {
    notFound();
  }

  return (
    <DesignExtensionsProvider>
      <UniformComposition
        {...result}
        resolveComponent={componentResolver}
        resolveEmptyPlaceholder={emptyPlaceholderResolver}
      />
    </DesignExtensionsProvider>
  );
}

export const dynamic = 'force-dynamic';

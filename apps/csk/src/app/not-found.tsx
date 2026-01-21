import { notFound } from 'next/navigation';
import { resolveRouteFromCode, UniformComposition } from '@uniformdev/next-app-router';
import { emptyPlaceholderResolver } from '@uniformdev/csk-components/components/canvas/emptyPlaceholders';

import { DesignExtensionsProvider } from '@uniformdev/design-extensions-tools/components/providers/server';
import { componentResolver } from '@/components';
import locales from '@/i18n/locales.json';
import resolveRouteFromRoutePath from '@/utils/resolveRouteFromRoutePath';
import { UniformClientContext } from '@/utils/clientContext';

const ROUTE_PATH = `/${locales.defaultLocale}/not-found`;

export default async function NotFound() {
  const { code } = await resolveRouteFromRoutePath(ROUTE_PATH);
  return (
    <DesignExtensionsProvider>
      <UniformComposition
        code={code}
        resolveRoute={resolveRouteFromCode}
        resolveComponent={componentResolver}
        clientContextComponent={UniformClientContext}
        resolveEmptyPlaceholder={emptyPlaceholderResolver}
      />
    </DesignExtensionsProvider>
  );
}

export const dynamic = 'force-dynamic';

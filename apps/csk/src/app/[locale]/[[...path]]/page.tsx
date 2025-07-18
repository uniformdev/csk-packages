import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';
import {
  ContextUpdateTransfer,
  PageParameters,
  UniformComposition,
  createServerUniformContext,
  isIncontextEditingEnabled,
} from '@uniformdev/canvas-next-rsc';
import { emptyPlaceholderResolver } from '@uniformdev/csk-components/components/canvas/emptyPlaceholders';
import { DesignExtensionsProvider } from '@uniformdev/design-extensions-tools/components/providers/server';
import { componentResolver } from '@/components';
import { DeviceTypeSetter } from '@/components/custom-ui/DeviceTypeSetter';
import locales from '@/i18n/locales.json';
import { routing } from '@/i18n/routing';
import { isAIAssistantConfigurationPage } from '@/modules/chat/utils';
import { DEVICE_TYPE_COOKIE_NAME } from '@/utils/deviceType';
import { getPreviewViewports } from '@/utils/previewClient';
import retrieveRoute from '@/utils/retrieveRoute';

export default async function Home(props: PageParameters) {
  const cookieStore = await cookies();

  const { path = '' } = (await props.params) || {};
  const pathname = typeof path === 'string' ? path : path.join('/');

  const currentLocale =
    Array.isArray(path) && path.length > 0 && routing.locales.includes(path[0]) ? path[0] : routing.defaultLocale;

  const searchParams = await props.searchParams;
  const isPreviewMode = isIncontextEditingEnabled({ searchParams });

  if (isAIAssistantConfigurationPage(isPreviewMode, pathname, currentLocale)) {
    return notFound();
  }

  const deviceType = cookieStore.get(DEVICE_TYPE_COOKIE_NAME)?.value || '';
  const locale = cookieStore.get('NEXT_LOCALE')?.value || locales.defaultLocale;
  const route = await retrieveRoute(props, locale);

  const serverContext = await createServerUniformContext({
    searchParams,
  });
  const previewViewports = await getPreviewViewports();

  return (
    <DesignExtensionsProvider isPreviewMode={isPreviewMode}>
      <UniformComposition
        {...props}
        route={route}
        resolveComponent={componentResolver}
        mode="server"
        resolveEmptyPlaceholder={emptyPlaceholderResolver}
        serverContext={serverContext}
      />
      <ContextUpdateTransfer
        serverContext={serverContext}
        update={{
          quirks: { ...(deviceType ? { [DEVICE_TYPE_COOKIE_NAME]: deviceType } : undefined) },
        }}
      />
      <DeviceTypeSetter previewViewports={previewViewports} />
    </DesignExtensionsProvider>
  );
}

export { generateMetadata } from '@/utils/metadata';

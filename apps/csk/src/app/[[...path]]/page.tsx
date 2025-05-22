import { cookies } from 'next/headers';
import {
  ContextUpdateTransfer,
  PageParameters,
  UniformComposition,
  createServerUniformContext,
  isIncontextEditingEnabled,
  //? if (localization) {
  retrieveRoute,
  //? }
} from '@uniformdev/canvas-next-rsc';
import { emptyPlaceholderResolver } from '@uniformdev/csk-components/components/canvas/emptyPlaceholders';
import { DesignExtensionsProvider } from '@uniformdev/design-extensions-tools/components/providers/server';
//? if (!localization) {
//? write('import locales from "@/i18n/locales.json";\n');
//? write('import retrieveRoute from "@/utils/retrieveRoute";\n');
//? }
import { componentResolver } from '@/components';
import { DeviceTypeSetter } from '@/components/custom-ui/DeviceTypeSetter';
import { DEVICE_TYPE_COOKIE_NAME } from '@/utils/deviceType';
import { getPreviewViewports } from '@/utils/previewClient';

export default async function Home(props: PageParameters) {
  const cookieStore = await cookies();
  const deviceType = cookieStore.get(DEVICE_TYPE_COOKIE_NAME)?.value || '';
  //? if (localization) {
  const route = await retrieveRoute(props);
  //? } else {
  //? write('const route = await retrieveRoute(props, locales.defaultLocale);\n');
  //? }

  const searchParams = await props.searchParams;
  const serverContext = await createServerUniformContext({
    searchParams,
  });
  const isPreviewMode = isIncontextEditingEnabled({ searchParams });
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

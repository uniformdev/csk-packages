import {
  PageParameters,
  UniformComposition,
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

export default async function Home(props: PageParameters) {
  //? if (localization) {
  const route = await retrieveRoute(props);
  //? } else {
  //? write('const route = await retrieveRoute(props, locales.defaultLocale);\n');
  //? }
  const searchParams = await props.searchParams;
  const isPreviewMode = searchParams?.is_incontext_editing_mode === 'true';
  return (
    <DesignExtensionsProvider isPreviewMode={isPreviewMode}>
      <UniformComposition
        {...props}
        route={route}
        resolveComponent={componentResolver}
        mode="server"
        resolveEmptyPlaceholder={emptyPlaceholderResolver}
      />
    </DesignExtensionsProvider>
  );
}

export { generateMetadata } from '@/utils/metadata';

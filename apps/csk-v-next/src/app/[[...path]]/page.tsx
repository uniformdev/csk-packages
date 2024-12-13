import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';
import {
  createServerUniformContext,
  ContextUpdateTransfer,
  PageParameters,
  UniformComposition,
} from '@uniformdev/canvas-next-rsc';
import { ThemePackProvider } from '@uniformdev/theme-pack/components';
import componentResolver from '@/components';
import locales from '@/i18n/locales.json';
import { isRouteWithoutErrors } from '@/utils';
import retrieveRoute from '@/utils/retrieveRoute';

export default async function Home(props: PageParameters) {
  const route = await retrieveRoute(props, locales.defaultLocale);
  if (!isRouteWithoutErrors(route)) return notFound();

  const theme = cookies().get('theme')?.value || 'light';
  const serverContext = await createServerUniformContext({
    searchParams: props.searchParams,
  });
  const isPreviewMode = props.searchParams?.preview === 'true';

  return (
    <ThemePackProvider isPreviewMode={isPreviewMode}>
      <ContextUpdateTransfer
        serverContext={serverContext}
        update={{
          quirks: {
            theme,
          },
        }}
      />
      <UniformComposition
        {...props}
        route={route}
        resolveComponent={componentResolver}
        serverContext={serverContext}
        mode="server"
      />
    </ThemePackProvider>
  );
}

export { generateMetadata } from '@/utils/generateMetadata';

export const dynamic = 'force-dynamic';

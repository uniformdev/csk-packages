import { cookies } from 'next/headers';
import {
  PageParameters,
  UniformComposition,
  createServerUniformContext,
  isIncontextEditingEnabled,
  retrieveRoute,
  ContextUpdateTransfer,
} from '@uniformdev/canvas-next-rsc';
import { emptyPlaceholderResolver } from '@uniformdev/csk-components/components/canvas/emptyPlaceholders';
import { DesignExtensionsProvider } from '@uniformdev/design-extensions-tools/components/providers/server';
import { componentResolver } from '@/components';

export default async function Home(props: PageParameters) {
  const cookieStore = await cookies();
  const deviceType = cookieStore.get('deviceType')?.value || '';
  const route = await retrieveRoute(props);
  const searchParams = await props.searchParams;
  const serverContext = await createServerUniformContext({
    searchParams,
  });
  const isPreviewMode = isIncontextEditingEnabled({ searchParams });
  return (
    <DesignExtensionsProvider isPreviewMode={isPreviewMode}>
      <ContextUpdateTransfer
        serverContext={serverContext}
        update={{
          quirks: { ...(deviceType ? { deviceType } : undefined) },
        }}
      />
      <UniformComposition
        {...props}
        route={route}
        resolveComponent={componentResolver}
        mode="server"
        resolveEmptyPlaceholder={emptyPlaceholderResolver}
        serverContext={serverContext}
      />
    </DesignExtensionsProvider>
  );
}

export { generateMetadata } from '@/utils/metadata';

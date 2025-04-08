import {
  PageParameters,
  UniformComposition,
  isIncontextEditingEnabled,
  retrieveRoute,
} from '@uniformdev/canvas-next-rsc';
import { emptyPlaceholderResolver } from '@uniformdev/csk-components/components/canvas/emptyPlaceholders';
import { DesignExtensionsProvider } from '@uniformdev/design-extensions-tools/components/providers/server';
import { componentResolver } from '@/components';
import { DeviceTypeSetter } from '@/components/custom-ui/DeviceTypeSetter';

export default async function Home(props: PageParameters) {
  const route = await retrieveRoute(props);

  const searchParams = await props.searchParams;
  const isPreviewMode = isIncontextEditingEnabled({ searchParams });
  return (
    <DesignExtensionsProvider isPreviewMode={isPreviewMode}>
      <UniformComposition
        {...props}
        route={route}
        resolveComponent={componentResolver}
        mode="server"
        resolveEmptyPlaceholder={emptyPlaceholderResolver}
      />
      <DeviceTypeSetter />
    </DesignExtensionsProvider>
  );
}

export { generateMetadata } from '@/utils/metadata';

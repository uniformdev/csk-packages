import { UniformPlayground, UniformPlaygroundProps } from '@uniformdev/canvas-next-rsc';
import { DesignExtensionsProvider } from '@uniformdev/design-extensions-tools/components/providers/server';
import { emptyPlaceholderResolver } from '@uniformdev/theme-pack/components/canvas/emptyPlaceholders';
import { componentResolver } from '@/components';

export default async function PlaygroundPage(props: { searchParams: UniformPlaygroundProps['searchParams'] }) {
  return (
    <DesignExtensionsProvider>
      <UniformPlayground
        {...props}
        resolveComponent={componentResolver}
        resolveEmptyPlaceholder={emptyPlaceholderResolver}
      />
    </DesignExtensionsProvider>
  );
}

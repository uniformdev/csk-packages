import {
  resolveRouteFromCode,
  UniformComposition,
  UniformPageParameters,
  createUniformStaticParams,
} from '@uniformdev/next-app-router';
import { emptyPlaceholderResolver } from '@uniformdev/csk-components/components/canvas/emptyPlaceholders';
import { compositionCache } from '@uniformdev/csk-components/utils/getSlotComponents';
import { DesignExtensionsProvider } from '@uniformdev/design-extensions-tools/components/providers/server';
import { componentResolver } from '@/components';
import getAllStaticGeneratedPages from '@/utils/getAllStaticGeneratedPages';
import { UniformClientContext } from '@/utils/clientContext';

export const generateStaticParams = async () => {
  const paths = await getAllStaticGeneratedPages();
  return createUniformStaticParams({
    paths,
  });
};

export default async function UniformPage({ params }: UniformPageParameters) {
  const { code } = await params;
  return (
    <DesignExtensionsProvider isPreviewMode={false}>
      <UniformComposition
        code={code}
        resolveRoute={resolveRouteFromCode}
        resolveComponent={componentResolver}
        clientContextComponent={UniformClientContext}
        resolveEmptyPlaceholder={emptyPlaceholderResolver}
        compositionCache={compositionCache}
      />
    </DesignExtensionsProvider>
  );
}

export { generateMetadata } from '@/utils/metadata';

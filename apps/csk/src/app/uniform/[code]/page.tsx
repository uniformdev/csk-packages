import { notFound } from 'next/navigation';
import { CANVAS_EDITOR_STATE } from '@uniformdev/canvas';
import {
  resolveRouteFromCode,
  UniformComposition,
  UniformPageParameters,
  createUniformStaticParams,
} from '@uniformdev/canvas-next-rsc-v2';
import { compositionCache } from '@uniformdev/csk-components/utils/getSlotComponents';
import { DesignExtensionsProvider } from '@uniformdev/design-extensions-tools/components/providers/server';
import { componentResolver } from '@/components';
import getAllStaticGeneratedPages from '@/utils/getAllStaticGeneratedPages';

export const generateStaticParams = async () => {
  const paths = await getAllStaticGeneratedPages();
  return createUniformStaticParams({
    paths,
  });
};

export default async function UniformPage(props: UniformPageParameters) {
  const result = await resolveRouteFromCode(props);

  if (!result.route) {
    notFound();
  }

  return (
    <DesignExtensionsProvider isPreviewMode={result.pageState.compositionState === CANVAS_EDITOR_STATE}>
      <UniformComposition {...result} resolveComponent={componentResolver} compositionCache={compositionCache} />
    </DesignExtensionsProvider>
  );
}

export { generateMetadata } from '@/utils/metadata';

import { RootComponentInstance } from '@uniformdev/canvas';
import { prependLocale, withUniformGetServerSideProps } from '@uniformdev/canvas-next/route';
import { createUniformApiEnhancer, UniformComposition } from '@uniformdev/canvas-react';
import { previewComponentResolver } from '@/components/preview';
import { PREVIEW_PATH } from '@/constants';

export const getServerSideProps = withUniformGetServerSideProps({
  modifyPath: (path, context) => {
    return prependLocale(path.replace(PREVIEW_PATH, ''), context);
  },
  handleComposition: async (routeResponse, _context) => {
    const { composition, errors } = routeResponse.compositionApiResponse || {};

    if (errors?.some(e => e.type === 'data' || e.type === 'binding')) {
      return { notFound: true };
    }

    return {
      props: { preview: Boolean(_context.preview), data: composition || null },
    };
  },
});

type PageProps = {
  data: RootComponentInstance;
  preview: boolean;
};

export default function Page({ data }: PageProps) {
  return (
    <UniformComposition
      data={data}
      behaviorTracking="onLoad"
      contextualEditingEnhancer={createUniformApiEnhancer({ apiUrl: '/api/preview' })}
      resolveRenderer={previewComponentResolver}
    />
  );
}

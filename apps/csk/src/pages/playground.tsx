import { FC } from 'react';
import { GetServerSidePropsContext } from 'next';
import { createUniformApiEnhancer, UniformPlayground } from '@uniformdev/canvas-react';
import {
  DesignExtensionsProvider,
  DesignExtensionsProviderProps,
} from '@uniformdev/design-extensions-tools/components/providers/server';
import { getTokenConfiguration } from '@uniformdev/design-extensions-tools/getTokenConfiguration';
import { componentResolver } from '@/components';

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const tokenConfiguration = await getTokenConfiguration(context.query.projectId);
  return { props: { tokenConfiguration } };
};

const Playground: FC<Pick<DesignExtensionsProviderProps, 'tokenConfiguration'>> = ({ tokenConfiguration }) => {
  const contextualEditingEnhancer = createUniformApiEnhancer({
    apiUrl: '/api/preview',
  });

  return (
    <DesignExtensionsProvider tokenConfiguration={tokenConfiguration} isPreviewMode={true}>
      <UniformPlayground
        contextualEditingEnhancer={contextualEditingEnhancer}
        behaviorTracking="onLoad"
        resolveRenderer={componentResolver}
      />
    </DesignExtensionsProvider>
  );
};

export default Playground;

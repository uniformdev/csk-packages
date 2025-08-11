import { FC } from 'react';
import { createUniformApiEnhancer, UniformPlayground } from '@uniformdev/canvas-react';
import { previewComponentResolver } from '@/components/preview';

const Playground: FC = () => (
  <UniformPlayground
    contextualEditingEnhancer={createUniformApiEnhancer({ apiUrl: '/api/preview' })}
    behaviorTracking="onLoad"
    resolveRenderer={previewComponentResolver}
  />
);

export default Playground;

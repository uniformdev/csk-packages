import { cskComponentsMapping } from '@/components/canvas';
import { customComponentsMapping } from '@/components/custom-canvas';

import createComponentResolver, { ComponentMapping } from '../utils/createComponentResolver';

const componentsMapping: ComponentMapping = {
  ...cskComponentsMapping,
  ...customComponentsMapping,
};

const componentResolver = createComponentResolver(componentsMapping);

export default componentResolver;

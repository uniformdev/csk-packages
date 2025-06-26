import createComponentResolver, { ComponentMapping } from '@uniformdev/csk-components/utils/createComponentResolver';
import { cskComponentsMapping } from '@/components/canvas';
import { customComponentsMapping } from '@/components/custom-canvas';
import { aiAssistantComponentsMapping } from '@/modules/chat';

const componentsMapping: ComponentMapping = {
  ...cskComponentsMapping,
  ...customComponentsMapping,
  ...aiAssistantComponentsMapping,
};

export const componentResolver = createComponentResolver(componentsMapping);

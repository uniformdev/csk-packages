import createAppRouterComponentResolver, {
  ComponentMapping,
} from '@uniformdev/csk-components/utils/createAppRouterComponentResolver';
import { cskComponentsMapping } from './canvas';

const componentsMapping: ComponentMapping = {
  ...cskComponentsMapping,
};

export const componentResolver = createAppRouterComponentResolver(componentsMapping);

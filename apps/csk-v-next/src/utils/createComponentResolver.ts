import { ComponentInstance } from '@uniformdev/canvas';
import { DefaultNotImplementedComponent, ResolveComponentResult } from '@uniformdev/canvas-next-rsc/component';

export type ComponentMapping = Record<string, ResolveComponentResult>;

const createComponentResolver =
  (mappings: ComponentMapping) =>
  ({ component }: { component: ComponentInstance }) =>
    mappings[component?.type] ?? { component: DefaultNotImplementedComponent };

export default createComponentResolver;

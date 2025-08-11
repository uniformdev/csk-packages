import { ComponentInstance, ComponentParameterEnhancerOptions } from '@uniformdev/canvas';
import { DefaultNotImplementedComponent } from '@uniformdev/canvas-react';

export type ComponentMapping = Record<
  string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  React.ComponentType<ComponentParameterEnhancerOptions<any>> | null
>;

const createComponentResolver = (mappings: ComponentMapping) => (component: ComponentInstance) =>
  mappings[component?.type] ?? DefaultNotImplementedComponent;

export default createComponentResolver;

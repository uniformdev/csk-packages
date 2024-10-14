import { FC } from 'react';
import { ComponentInstance } from '@uniformdev/canvas';
import { DefaultNotImplementedComponent } from '@uniformdev/canvas-next-rsc/component';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ComponentMapping = Record<string, FC<any>>;

const createComponentResolver =
  (mappings: ComponentMapping) =>
  ({ component }: { component: ComponentInstance }) => ({
    component: mappings[component?.type] || DefaultNotImplementedComponent,
  });

export default createComponentResolver;

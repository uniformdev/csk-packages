import { ComponentProps } from '@uniformdev/canvas-react';
import { ContainerParameters } from '@/new-components/canvas/Container';

export type ContainerAdditionalProps = {
  className?: string;
};

export type ContainerProps = ComponentProps<ContainerParameters> & ContainerAdditionalProps;

export { type ContainerParameters };
export { default } from './container';

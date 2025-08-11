import { ContainerParameters, ContainerSlots } from '@/new-components/canvas/Container';
import { ComponentProps } from '@/types/canvasTypes';

export type ContainerAdditionalProps = {
  className?: string;
};

export type ContainerProps = ComponentProps<ContainerParameters, ContainerSlots> & ContainerAdditionalProps;

export { type ContainerParameters };
export { default } from './container';

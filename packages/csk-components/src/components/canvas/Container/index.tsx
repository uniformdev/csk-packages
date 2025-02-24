import { ComponentProps } from '@uniformdev/canvas-next-rsc/component';
import { ContainerParameters } from './parameters';

export type ContainerAdditionalProps = {
  className?: string;
};

export enum ContainerSlots {
  ContainerContent = 'containerContent',
}

export type ContainerProps = ComponentProps<ContainerParameters & ContainerAdditionalProps, ContainerSlots>;

export { type ContainerParameters } from './parameters';
export { Container as default } from './container';

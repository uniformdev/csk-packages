import { ComponentProps } from '@/types/cskTypes';
import { ContainerParameters } from './parameters';

export type ContainerAdditionalProps = {
  className?: string;
};

export enum ContainerSlots {
  ContainerContent = 'containerContent',
}

export type ContainerProps = ComponentProps<ContainerParameters, ContainerSlots> & ContainerAdditionalProps;

export { type ContainerParameters } from './parameters';
export { default } from './container';

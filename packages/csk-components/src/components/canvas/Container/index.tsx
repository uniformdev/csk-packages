import { ComponentProps } from '@uniformdev/canvas-next-rsc/component';
import { SpaceType, ViewPort } from '@uniformdev/csk-components/types/cskTypes';

export type ContainerAdditionalProps = {
  className?: string;
};

export type ContainerParameters = {
  displayName?: string;
  anchor?: string;
  backgroundColor?: string;
  spacing?: SpaceType | ViewPort<SpaceType>;
  border?: string | ViewPort<string>;
  fluidContent?: boolean;
  fullHeight?: boolean;
};

export enum ContainerSlots {
  ContainerContent = 'containerContent',
}

export type ContainerProps = ComponentProps<ContainerParameters & ContainerAdditionalProps, ContainerSlots>;

export { Container as default } from './container';

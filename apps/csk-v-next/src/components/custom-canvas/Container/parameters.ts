import { SpaceType, ViewPort } from '@/types/cskTypes';

export type ContainerParameters = {
  displayName?: string;
  anchor?: string;
  backgroundColor?: string;
  spacing?: SpaceType | ViewPort<SpaceType>;
  border?: string | ViewPort<string>;
  maxWidth?: string;
  fluidContent?: boolean;
  fullHeight?: boolean;
};

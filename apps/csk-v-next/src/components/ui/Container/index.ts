import { HTMLAttributes } from 'react';
import { SpaceType, ViewPort } from '@/types/cskTypes';

export type ContainerProps = HTMLAttributes<HTMLDivElement> & {
  backgroundColor?: string;
  backgroundImageUrl?: string;
  spacing?: SpaceType | ViewPort<SpaceType>;
  border?: string | ViewPort<string>;
  fluidContent?: boolean;
  fullHeight?: boolean;
  maxWidth?: string;
  wrapperClassName?: string;
};

export { Container as default } from './container';

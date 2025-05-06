import { HTMLAttributes } from 'react';
import { SpaceType, ViewPort } from '@/types/cskTypes';

export type ContainerProps = HTMLAttributes<HTMLDivElement> & {
  backgroundColor?: string;
  spacing?: SpaceType | ViewPort<SpaceType>;
  border?: string | ViewPort<string>;
  fluidContent?: boolean;
  fullHeight?: boolean;
  wrapperClassName?: string;
  maxWidth?: string;
};

export { Container as default } from './container';

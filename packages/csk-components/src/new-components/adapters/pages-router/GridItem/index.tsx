import { ComponentProps } from '@uniformdev/canvas-react';
import { GridItemParameters } from '@/new-components/canvas/GridItem';

export type GridItemAdditionalProps = {
  className?: string;
};

export type GridItemProps = ComponentProps<GridItemParameters> & GridItemAdditionalProps;

export { default } from './grid-item';

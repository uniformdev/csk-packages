import { GridItemParameters, GridItemSlots } from '@/new-components/canvas/GridItem';
import { ComponentProps } from '@/types/canvasTypes';

export type GridItemAdditionalProps = {
  className?: string;
};

export type GridItemProps = ComponentProps<GridItemParameters, GridItemSlots> & GridItemAdditionalProps;

export { default } from './grid-item';

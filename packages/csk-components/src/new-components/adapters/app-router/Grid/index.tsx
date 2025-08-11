import { GridParameters, GridSlots } from '@/new-components/canvas/Grid';
import { ComponentProps } from '@/types/canvasTypes';

export type GridAdditionalProps = {
  className?: string;
};

export type GridProps = ComponentProps<GridParameters, GridSlots> & GridAdditionalProps;

export { default } from './grid';

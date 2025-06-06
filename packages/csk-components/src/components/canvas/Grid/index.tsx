import { ComponentProps } from '@uniformdev/canvas-next-rsc/component';
import { ContainerParameters } from '@/components/canvas/Container/parameters';
import { ViewPort } from '@/types/cskTypes';
import { Grid } from './grid';

type AvailableGridColumnsCount = '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | '11' | '12';
type AvailableGridGap = '2' | '8' | '16';

export type GridAdditionalProps = {
  className?: string;
};

export type GridParameters = ContainerParameters & {
  columnsCount?: AvailableGridColumnsCount | ViewPort<AvailableGridColumnsCount>;
  gapY?: AvailableGridGap | ViewPort<AvailableGridGap>;
  gapX?: AvailableGridGap | ViewPort<AvailableGridGap>;
};

export enum GridSlots {
  GridInner = 'gridInner',
}

export type GridProps = ComponentProps<GridParameters & GridAdditionalProps, GridSlots>;

export default Grid;

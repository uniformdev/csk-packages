import { ComponentProps } from '@uniformdev/canvas-next-rsc/component';
import { withPlaygroundWrapper } from '@/hocs/withPlaygroundWrapper';
import { ViewPort } from '@/types/cskTypes';
import { GridItem } from './grid-item';

type AvailableGridItemColumnsCount = '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | '11' | '12';
type AvailableGridItemSpan =
  | 'auto'
  | 'span-1'
  | 'span-2'
  | 'span-3'
  | 'span-4'
  | 'span-5'
  | 'span-6'
  | 'span-7'
  | 'span-8'
  | 'span-9'
  | 'span-10'
  | 'span-11'
  | 'span-12'
  | 'span-full';

export type AvailableGridItemRowStart = '1' | '2' | '3' | '4' | '5' | '6';

export type GridItemAdditionalProps = {
  className?: string;
};

export type GridItemParameters = {
  displayName?: string;
  columnStart?: AvailableGridItemColumnsCount | ViewPort<AvailableGridItemColumnsCount>;
  columnSpan?: AvailableGridItemSpan | ViewPort<AvailableGridItemSpan>;
  rowStart?: AvailableGridItemRowStart | ViewPort<AvailableGridItemRowStart>;
  rowSpan?: AvailableGridItemSpan | ViewPort<AvailableGridItemSpan>;
};

export enum GridItemSlots {
  Inner = 'inner',
}

export type GridItemProps = ComponentProps<GridItemParameters & GridItemAdditionalProps, GridItemSlots>;

export default withPlaygroundWrapper(GridItem);

import { FC } from 'react';
import { ComponentProps, UniformSlot } from '@uniformdev/canvas-next-rsc/component';
import { ContainerParameters } from '@/components/canvas/Container';
import BaseGrid from '@/components/ui/Grid';
import { withPlaygroundWrapper } from '@/hocs';
import { ViewPort } from '@/types';

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

enum GridSlots {
  GridInner = 'gridInner',
}

export type GridProps = ComponentProps<GridParameters & GridAdditionalProps, GridSlots>;

const Grid: FC<GridProps> = ({
  columnsCount,
  gapX,
  gapY,
  backgroundColor,
  spacing,
  border,
  fluidContent,
  fullHeight,
  slots,
  component,
  context,
  className,
}) => (
  <BaseGrid
    className={className}
    {...{ columnsCount, gapX, gapY, backgroundColor, spacing, border, fluidContent, fullHeight }}
  >
    <UniformSlot data={component} context={context} slot={slots.gridInner} />
  </BaseGrid>
);

export default withPlaygroundWrapper(Grid);

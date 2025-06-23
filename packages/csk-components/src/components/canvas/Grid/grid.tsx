import { FC } from 'react';
import { UniformSlot } from '@uniformdev/canvas-next-rsc/component';
import BaseGrid from '@/components/ui/Grid';
import { GridProps } from '.';

export const Grid: FC<GridProps> = ({
  columnsCount,
  gapX,
  gapY,
  backgroundColor,
  spacing,
  border,
  fluidContent,
  fullHeight,
  fitHeight,
  height,
  slots,
  component,
  context,
  className,
}) => (
  <BaseGrid
    className={className}
    {...{ columnsCount, gapX, gapY, backgroundColor, spacing, border, fluidContent, fullHeight, fitHeight, height }}
  >
    <UniformSlot data={component} context={context} slot={slots.gridInner} />
  </BaseGrid>
);

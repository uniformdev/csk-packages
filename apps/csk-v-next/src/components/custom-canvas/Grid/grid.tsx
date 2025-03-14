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
  slots,
  component,
  context,
  className,
  alignItems,
}) => (
  <BaseGrid
    className={className}
    {...{ columnsCount, gapX, gapY, backgroundColor, spacing, border, fluidContent, fullHeight, alignItems }}
  >
    <UniformSlot data={component} context={context} slot={slots.gridInner} />
  </BaseGrid>
);

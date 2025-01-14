import { FC } from 'react';
import { UniformSlot } from '@uniformdev/canvas-next-rsc/component';
import { Grid as BaseGrid } from '@uniformdev/theme-pack/components/ui';
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
}) => (
  <BaseGrid
    className={className}
    {...{ columnsCount, gapX, gapY, backgroundColor, spacing, border, fluidContent, fullHeight }}
  >
    <UniformSlot data={component} context={context} slot={slots.gridInner} />
  </BaseGrid>
);

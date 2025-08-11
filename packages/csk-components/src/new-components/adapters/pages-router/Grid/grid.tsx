import { FC } from 'react';
import { UniformSlot } from '@uniformdev/canvas-react';
import { GridSlots } from '@/new-components/canvas/Grid';
import BaseGrid from '@/new-components/ui/Grid';
import { GridProps } from '.';

const Grid: FC<GridProps> = ({
  columnsCount,
  gapX,
  gapY,
  backgroundColor,
  spacing,
  border,
  fluidContent,
  height,
  className,
}) => (
  <BaseGrid
    className={className}
    {...{ columnsCount, gapX, gapY, backgroundColor, spacing, border, fluidContent, height }}
  >
    <UniformSlot name={GridSlots.GridInner} />
  </BaseGrid>
);

export default Grid;

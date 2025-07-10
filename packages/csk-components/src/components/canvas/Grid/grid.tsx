import { FC } from 'react';
import { UniformSlot } from '@uniformdev/canvas-next-rsc-v2/component';
import BaseGrid from '@/components/ui/Grid';
import { withFlattenParameters } from '@/utils/withFlattenParameters';
import { GridParameters, GridProps } from '.';

const Grid: FC<GridProps & GridParameters> = ({
  columnsCount,
  gapX,
  gapY,
  backgroundColor,
  spacing,
  border,
  fluidContent,
  height,
  slots,
  className,
}) => (
  <BaseGrid
    className={className}
    {...{ columnsCount, gapX, gapY, backgroundColor, spacing, border, fluidContent, height }}
  >
    <UniformSlot slot={slots.gridInner} />
  </BaseGrid>
);

export default withFlattenParameters(Grid);

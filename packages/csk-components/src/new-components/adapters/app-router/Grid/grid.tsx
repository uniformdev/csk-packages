import { FC } from 'react';
import { UniformSlot } from '@uniformdev/canvas-next-rsc-v2/component';
import { GridParameters } from '@/new-components/canvas/Grid';
import BaseGrid from '@/new-components/ui/Grid';
import { withFlattenParameters } from '@/utils/withFlattenParameters';
import { GridProps } from '.';

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
  alignItems,
}) => (
  <BaseGrid
    className={className}
    {...{ columnsCount, gapX, gapY, backgroundColor, spacing, border, fluidContent, height, alignItems }}
  >
    <UniformSlot slot={slots.gridInner} />
  </BaseGrid>
);

export default withFlattenParameters(Grid);

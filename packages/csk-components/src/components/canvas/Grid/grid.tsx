import { FC } from 'react';
import { UniformSlot } from '@uniformdev/next-app-router/component';
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

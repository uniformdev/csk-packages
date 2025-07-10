import { FC } from 'react';
import { UniformSlot } from '@uniformdev/canvas-next-rsc-v2/component';
import BaseGridItem from '@/components/ui/GridItem';
import { withFlattenParameters } from '@/utils/withFlattenParameters';
import { GridItemParameters, GridItemProps } from '.';

const GridItem: FC<GridItemProps & GridItemParameters> = ({
  columnStart,
  columnSpan,
  rowStart,
  className,
  rowSpan,
  slots,
}) => (
  <BaseGridItem {...{ columnStart, columnSpan, rowStart, rowSpan, className }}>
    <UniformSlot slot={slots.inner} />
  </BaseGridItem>
);

export default withFlattenParameters(GridItem);

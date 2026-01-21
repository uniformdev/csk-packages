import { FC } from 'react';
import { UniformSlot } from '@uniformdev/next-app-router/component';
import BaseGridItem from '@/components/ui/GridItem';
import { withFlattenParameters } from '@/utils/withFlattenParameters';
import { GridItemParameters, GridItemProps } from '.';

const GridItem: FC<GridItemProps & GridItemParameters> = ({
  columnStart,
  columnSpan,
  rowStart,
  rowSpan,
  alignSelf,
  className,
  slots,
}) => (
  <BaseGridItem {...{ columnStart, columnSpan, rowStart, rowSpan, alignSelf, className }}>
    <UniformSlot slot={slots.inner} />
  </BaseGridItem>
);

export default withFlattenParameters(GridItem);

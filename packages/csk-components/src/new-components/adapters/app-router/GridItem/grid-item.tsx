import { FC } from 'react';
import { UniformSlot } from '@uniformdev/canvas-next-rsc-v2/component';
import { GridItemParameters } from '@/new-components/canvas/GridItem';
import BaseGridItem from '@/new-components/ui/GridItem';
import { withFlattenParameters } from '@/utils/withFlattenParameters';
import { GridItemProps } from '.';

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

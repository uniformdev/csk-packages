import { FC } from 'react';
import { UniformSlot } from '@uniformdev/canvas-react';
import { GridItemSlots } from '@/new-components/canvas/GridItem';
import BaseGridItem from '@/new-components/ui/GridItem';
import { GridItemProps } from '.';

const GridItem: FC<GridItemProps> = ({ columnStart, columnSpan, rowStart, className, rowSpan }) => (
  <BaseGridItem {...{ columnStart, columnSpan, rowStart, rowSpan, className }}>
    <UniformSlot name={GridItemSlots.Inner} />
  </BaseGridItem>
);

export default GridItem;

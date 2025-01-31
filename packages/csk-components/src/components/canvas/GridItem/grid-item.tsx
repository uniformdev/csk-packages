import { FC } from 'react';
import { UniformSlot } from '@uniformdev/canvas-next-rsc/component';
import { GridItem as BaseGridItem } from '@uniformdev/csk-components/components/ui';
import { GridItemProps } from '.';

export const GridItem: FC<GridItemProps> = ({
  columnStart,
  columnSpan,
  rowStart,
  className,
  rowSpan,
  context,
  component,
  slots,
}) => (
  <BaseGridItem {...{ columnStart, columnSpan, rowStart, rowSpan, className }}>
    <UniformSlot data={component} context={context} slot={slots.inner} />
  </BaseGridItem>
);

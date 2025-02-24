import { FC } from 'react';
import { UniformSlot } from '@uniformdev/canvas-next-rsc/component';
import BaseFlex from '@/components/ui/Flex';
import { FlexProps } from '.';

export const Flex: FC<FlexProps> = ({
  direction,
  justifyContent,
  gap,
  alignItems,
  backgroundColor,
  spacing,
  border,
  fluidContent,
  fullHeight,
  slots,
  component,
  context,
  className,
  wrapperClassName,
}) => (
  <BaseFlex
    {...{
      direction,
      justifyContent,
      gap,
      alignItems,
      backgroundColor,
      spacing,
      border,
      fluidContent,
      fullHeight,
      wrapperClassName,
      className,
    }}
  >
    <UniformSlot data={component} context={context} slot={slots.flexItem} />
  </BaseFlex>
);

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
  slots,
  component,
  context,
  className,
  height,
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
      height,
      wrapperClassName,
      className,
    }}
  >
    <UniformSlot data={component} context={context} slot={slots.flexItem} />
  </BaseFlex>
);

import { FC } from 'react';
import { UniformSlot } from '@uniformdev/canvas-react';
import { FlexSlots } from '@/new-components/canvas/Flex';
import BaseFlex from '@/new-components/ui/Flex';
import { FlexProps } from '.';

const Flex: FC<FlexProps> = ({
  direction,
  justifyContent,
  gap,
  alignItems,
  backgroundColor,
  spacing,
  border,
  fluidContent,
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
    <UniformSlot name={FlexSlots.FlexItem} />
  </BaseFlex>
);

export default Flex;

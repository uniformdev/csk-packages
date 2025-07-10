import { FC } from 'react';
import { UniformSlot } from '@uniformdev/canvas-next-rsc-v2/component';
import BaseFlex from '@/components/ui/Flex';
import { withFlattenParameters } from '@/utils/withFlattenParameters';
import { FlexProps, FlexParameters } from '.';

const Flex: FC<FlexProps & FlexParameters> = ({
  direction,
  justifyContent,
  gap,
  alignItems,
  backgroundColor,
  spacing,
  border,
  fluidContent,
  slots,
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
    <UniformSlot slot={slots.flexItem} />
  </BaseFlex>
);

export default withFlattenParameters(Flex);

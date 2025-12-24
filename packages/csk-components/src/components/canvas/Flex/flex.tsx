import { FC } from 'react';
import { UniformSlot } from '@uniformdev/next-app-router/component';
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
  wrap,
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
      wrap,
    }}
  >
    <UniformSlot slot={slots.flexItem} />
  </BaseFlex>
);

export default withFlattenParameters(Flex);

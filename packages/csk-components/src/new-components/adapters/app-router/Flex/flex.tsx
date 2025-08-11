import { FC } from 'react';
import { UniformSlot } from '@uniformdev/canvas-next-rsc-v2/component';
import { FlexParameters } from '@/new-components/canvas/Flex';
import BaseFlex from '@/new-components/ui/Flex';
import { withFlattenParameters } from '@/utils/withFlattenParameters';
import { FlexProps } from '.';

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

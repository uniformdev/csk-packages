import { FC } from 'react';
import { UniformSlot } from '@uniformdev/next-app-router/component';
import BaseFlexItem from '@/components/ui/FlexItem';
import { withFlattenParameters } from '@/utils/withFlattenParameters';
import { FlexItemProps, FlexItemParameters } from '.';

const FlexItem: FC<FlexItemProps & FlexItemParameters> = ({ alignSelf, shrink, slots }) => (
  <BaseFlexItem {...{ alignSelf, shrink }}>
    <UniformSlot slot={slots.inner} />
  </BaseFlexItem>
);

export default withFlattenParameters(FlexItem);

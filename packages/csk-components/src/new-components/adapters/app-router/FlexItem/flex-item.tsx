import { FC } from 'react';
import { UniformSlot } from '@uniformdev/canvas-next-rsc-v2/component';
import { FlexItemParameters } from '@/new-components/canvas/FlexItem';
import BaseFlexItem from '@/new-components/ui/FlexItem';
import { withFlattenParameters } from '@/utils/withFlattenParameters';
import { FlexItemProps } from '.';

const FlexItem: FC<FlexItemProps & FlexItemParameters> = ({ alignSelf, shrink, slots }) => (
  <BaseFlexItem {...{ alignSelf, shrink }}>
    <UniformSlot slot={slots.inner} />
  </BaseFlexItem>
);

export default withFlattenParameters(FlexItem);

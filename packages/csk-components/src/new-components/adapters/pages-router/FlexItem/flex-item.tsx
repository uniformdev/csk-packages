import { FC } from 'react';
import { UniformSlot } from '@uniformdev/canvas-react';
import { FlexItemSlots } from '@/new-components/canvas/FlexItem';
import BaseFlexItem from '@/new-components/ui/FlexItem';
import { FlexItemProps } from '.';

const FlexItem: FC<FlexItemProps> = ({ alignSelf, shrink }) => (
  <BaseFlexItem {...{ alignSelf, shrink }}>
    <UniformSlot name={FlexItemSlots.Inner} />
  </BaseFlexItem>
);

export default FlexItem;

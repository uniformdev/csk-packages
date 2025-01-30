import { FC } from 'react';
import { UniformSlot } from '@uniformdev/canvas-next-rsc/component';
import { FlexItem as BaseFlexItem } from '@uniformdev/csk-components/components/ui';
import { FlexItemProps } from '.';

export const FlexItem: FC<FlexItemProps> = ({ alignSelf, shrink, context, component, slots }) => (
  <BaseFlexItem {...{ alignSelf, shrink }}>
    <UniformSlot data={component} context={context} slot={slots.inner} />
  </BaseFlexItem>
);

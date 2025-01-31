import { FC } from 'react';
import { UniformSlot } from '@uniformdev/canvas-next-rsc/component';
import { TabProps } from '.';

export const Tab: FC<TabProps> = ({ slots, component, context }) => (
  <UniformSlot data={component} context={context} slot={slots.tabContent} />
);

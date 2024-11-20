import { FC } from 'react';
import { ComponentProps, UniformSlot } from '@uniformdev/canvas-next-rsc/component';
import { withPlaygroundWrapper } from '@/hocs';

export type TabParameters = { title?: string };
enum TabSlots {
  TabContent = 'tabContent',
}

type TabProps = ComponentProps<TabParameters, TabSlots>;

const Tab: FC<TabProps> = ({ slots, component, context }) => (
  <UniformSlot data={component} context={context} slot={slots.tabContent} />
);

export default withPlaygroundWrapper(Tab);

import { ComponentProps } from '@uniformdev/canvas-next-rsc/component';
import { Tab } from './tab';

export type TabParameters = { title?: string };

export enum TabSlots {
  TabContent = 'tabContent',
}

export type TabProps = ComponentProps<TabParameters, TabSlots>;

export default Tab;

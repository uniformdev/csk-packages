import { ComponentProps } from '@/types/cskTypes';

export type TabParameters = { title?: string };

export enum TabSlots {
  TabContent = 'tabContent',
}

export type TabProps = ComponentProps<TabParameters, TabSlots>;

export { default } from './tab';

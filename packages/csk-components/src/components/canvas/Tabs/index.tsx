import dynamic from 'next/dynamic';
import { ComponentProps } from '@uniformdev/canvas-next-rsc/component';
import { ContainerParameters } from '@/components/canvas/Container/parameters';

export type TabsParameters = ContainerParameters & {
  color?: string;
};

export enum TabsVariants {
  Default = 'default',
  Bordered = 'bordered',
}

export enum TabsSlots {
  TabItems = 'tabItems',
}

export type TabsProps = ComponentProps<TabsParameters, TabsSlots>;

export default dynamic(() => import('./tabs').then(mod => mod.Tabs));
export { TabsEmptyPlaceholder } from './empty-placeholder';

import dynamic from 'next/dynamic';
import { ContainerParameters } from '@/components/canvas/Container/parameters';
import { ComponentProps } from '@/types/cskTypes';

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

export default dynamic(() => import('./tabs').then(mod => mod.default));
export { TabsEmptyPlaceholder } from './empty-placeholder';

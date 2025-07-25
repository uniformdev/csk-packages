import dynamic from 'next/dynamic';
import { ContainerParameters } from '@/components/canvas/Container/parameters';
import { ComponentProps } from '@/types/cskTypes';
import { withFlattenParameters } from '@/utils/withFlattenParameters';
import { withSlotsDataValue } from '@/utils/withSlotsDataValue';

export type TabsParameters = ContainerParameters & {
  color?: string;
};

export enum TabsSlots {
  TabItems = 'tabItems',
}

export type TabsProps = ComponentProps<TabsParameters, TabsSlots>;

export { TabsVariants } from './style-utils';
export default dynamic(() =>
  import('./tabs').then(mod => withSlotsDataValue(withFlattenParameters(mod.Tabs), [TabsSlots.TabItems]))
);
export { TabsEmptyPlaceholder } from './empty-placeholder';

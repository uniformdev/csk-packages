import { cn } from '@uniformdev/theme-pack/utils/styling';
import { TabsParameters, TabsVariants } from '.';

type ButtonContainerClassesProps = {
  color: TabsParameters['color'];
  variant: TabsVariants;
};
export const getButtonContainerClasses = ({ color, variant }: ButtonContainerClassesProps) =>
  cn('flex flex-row overflow-x-auto ', {
    [`border-${color} border-b`]: color && variant === TabsVariants.Bordered,
  });

type ButtonClassesProps = {
  color: TabsParameters['color'];
  variant: TabsVariants;
  tabItem: {
    id: string;
  };
  activeTabId: string;
};
export const getButtonClasses = ({ color, variant, tabItem, activeTabId }: ButtonClassesProps) =>
  cn('text-lg shrink-0 font-medium px-5 py-3', {
    [`text-${color}`]: color,
    [`border-${color}`]: tabItem.id === activeTabId && variant === TabsVariants.Bordered,
    'border-b-2': variant === TabsVariants.Bordered,
    'opacity-60 hover:opacity-100': tabItem.id !== activeTabId,
    'border-transparent': tabItem.id !== activeTabId && variant === TabsVariants.Bordered,
  });

'use client';
import { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { flattenValues } from '@uniformdev/canvas';
import { ComponentProps, UniformSlot, UniformText } from '@uniformdev/canvas-next-rsc/component';
import { ContainerParameters } from '@/components/canvas/Container';
import { TabParameters } from '@/components/canvas/Tab';
import Container from '@/components/ui/Container';
import { withPlaygroundWrapper } from '@/hocs';
import { cn } from '@/utils';

export type TabsParameters = ContainerParameters & {
  color?: string;
};

enum TabsSlots {
  TabItems = 'tabItems',
}

export enum TabsVariants {
  Default = 'default',
  Bordered = 'bordered',
}

type TabsProps = ComponentProps<TabsParameters, TabsSlots>;

const Tabs: FC<TabsProps> = ({
  slots,
  color,
  component,
  context,
  backgroundColor,
  spacing,
  border,
  fluidContent,
  fullHeight,
}) => {
  const variant = (component.variant || TabsVariants.Default) as TabsVariants;
  const [activeTabId, setActiveTabId] = useState(component?.slots?.tabItems?.[0]?._id as string);

  const tabItems = useMemo(() => {
    if (!component?.slots?.tabItems) return [];
    return component.slots.tabItems.map(tabComponent => ({
      ...(flattenValues(tabComponent) as TabParameters),
      id: tabComponent._id as string,
    }));
  }, [component?.slots?.tabItems]);

  useEffect(() => {
    if (!tabItems.length) return;
    if (!activeTabId) setActiveTabId(tabItems[0].id);
  }, [tabItems, activeTabId]);

  const handleContextualEditingTabClick = useCallback(
    (tabId: string) => {
      if (!context.isContextualEditing) return;

      setActiveTabId(tabId);
    },
    [context.isContextualEditing]
  );

  return (
    <Container className="flex flex-col gap-5" {...{ backgroundColor, spacing, border, fluidContent, fullHeight }}>
      <div
        className={cn('flex flex-row overflow-x-auto ', {
          [`border-${color} border-b`]: color && variant === TabsVariants.Bordered,
        })}
      >
        {tabItems.map((tabItem, index) => (
          <button
            key={tabItem.id}
            onClick={() => setActiveTabId(tabItem.id)}
            className={cn('text-lg shrink-0 font-medium px-5 py-3', {
              [`text-${color}`]: color,
              [`border-${color}`]: tabItem.id === activeTabId && variant === TabsVariants.Bordered,
              'border-b-2': variant === TabsVariants.Bordered,
              'opacity-60 hover:opacity-100': tabItem.id !== activeTabId,
              'border-transparent': tabItem.id !== activeTabId && variant === TabsVariants.Bordered,
            })}
          >
            {component?.slots?.tabItems[index] && (
              <UniformText
                onFocus={() => handleContextualEditingTabClick(tabItem.id)}
                context={context}
                parameterId="text"
                component={component?.slots?.tabItems[index]}
                placeholder="Tab title"
              />
            )}
          </button>
        ))}
      </div>
      <UniformSlot data={component} context={context} slot={slots.tabItems}>
        {({ child, component }) => (component._id === activeTabId ? <>{child}</> : <></>)}
      </UniformSlot>
    </Container>
  );
};

export default withPlaygroundWrapper(Tabs);

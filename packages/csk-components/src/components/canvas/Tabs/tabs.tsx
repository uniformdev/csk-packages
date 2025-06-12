'use client';

import { FC, Fragment, useCallback, useEffect, useMemo, useState } from 'react';
import { flattenValues } from '@uniformdev/canvas';
import { UniformSlot, UniformText } from '@uniformdev/canvas-next-rsc/component';
import Container from '@/components/ui/Container';
import { TabsProps, TabsVariants } from '.';
import { getButtonClasses, getButtonContainerClasses } from './style-utils';

export const Tabs: FC<TabsProps> = ({
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
      ...(flattenValues(tabComponent) as { title?: string }),
      id: tabComponent._id as string,
    }));
  }, [component?.slots?.tabItems]);

  useEffect(() => {
    if (!tabItems.length) return;
    if (!activeTabId) setActiveTabId(tabItems[0]?.id || '');
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
      <div className={getButtonContainerClasses({ color, variant })}>
        {tabItems.map((tabItem, index) => (
          <button
            key={tabItem.id}
            onClick={() => setActiveTabId(tabItem.id)}
            className={getButtonClasses({ color, variant, tabItem, activeTabId })}
          >
            {component?.slots?.tabItems?.[index] && (
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
        {({ child, component: { _id: currentComponentId } }) =>
          currentComponentId === activeTabId ? (
            <Fragment key={currentComponentId}>{child}</Fragment>
          ) : (
            <Fragment key={currentComponentId} />
          )
        }
      </UniformSlot>
    </Container>
  );
};

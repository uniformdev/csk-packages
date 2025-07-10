'use client';

import { FC, Fragment, useCallback, useState, MouseEvent, FocusEvent } from 'react';
import { ComponentInstance, flattenValues } from '@uniformdev/canvas';
import { UniformSlot, UniformText, ComponentParameter } from '@uniformdev/canvas-next-rsc-v2/component';
import Container from '@/components/ui/Container';
import { TabsParameters, TabsProps } from '.';
import { getButtonClasses, getButtonContainerClasses } from './style-utils';

const TAB_ITEM_TEXT_PARAMETER_ID = 'text';
const TAB_ITEM_TEXT_PARAMETER_TYPE = 'text';

export const Tabs: FC<TabsProps & TabsParameters & { slotData?: Record<string, ComponentInstance[]> }> = ({
  slots,
  color,
  backgroundColor,
  spacing,
  border,
  fluidContent,
  height,
  variant,
  slotData,
  context,
}) => {
  const tabItems = slotData?.tabItems?.map(tabComponent => ({
    ...(flattenValues(tabComponent) as { text?: string }),
    id: (tabComponent?._id as string) || '',
  }));

  const [activeTabId, setActiveTabId] = useState(tabItems?.[0]?.id || '');

  const handleTabClick = useCallback((event: MouseEvent<HTMLButtonElement>) => {
    const tabId = (event.target as HTMLButtonElement).id;
    setActiveTabId(tabId);
  }, []);

  const handleContextualEditingTabClick = useCallback(
    (event: FocusEvent<HTMLButtonElement>) => {
      const tabId = event.target.id;
      if (!context.isContextualEditing) return;
      setActiveTabId(tabId);
    },
    [context.isContextualEditing]
  );

  return (
    <Container className="flex flex-col gap-5" {...{ backgroundColor, spacing, border, fluidContent, height }}>
      <div className={getButtonContainerClasses({ color, variant })}>
        {tabItems?.map(({ id: currentTabId, [TAB_ITEM_TEXT_PARAMETER_ID]: currentTabText }) => (
          <button
            id={currentTabId}
            key={currentTabId}
            onClick={handleTabClick}
            className={getButtonClasses({ color, variant, isActiveTab: currentTabId === activeTabId })}
          >
            <UniformText
              id={currentTabId}
              placeholder="Text goes here"
              onFocus={handleContextualEditingTabClick}
              parameter={
                {
                  parameterId: TAB_ITEM_TEXT_PARAMETER_ID,
                  type: TAB_ITEM_TEXT_PARAMETER_TYPE,
                  value: currentTabText,
                  _contextualEditing: { isEditable: true },
                } as ComponentParameter<string>
              }
              component={{ _id: currentTabId }}
            />
          </button>
        ))}
      </div>
      <UniformSlot slot={slots.tabItems}>
        {({ child, _id: currentComponentId, key }) =>
          currentComponentId === activeTabId ? <Fragment key={key}>{child}</Fragment> : <Fragment key={key} />
        }
      </UniformSlot>
    </Container>
  );
};

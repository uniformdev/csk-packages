'use client';

import { FC } from 'react';
import { withFlattenParameters } from '@/utils/withFlattenParameters';
import { TabsParameters, TabsProps } from '.';

const Tabs: FC<TabsProps & TabsParameters> = () => {
  return null;
  // const [activeTabId, setActiveTabId] = useState(component?.slots?.tabItems?.[0]?._id as string);

  // const tabItems = useMemo(() => {
  //   if (!component?.slots?.tabItems) return [];
  //   return component.slots.tabItems.map(tabComponent => ({
  //     ...(flattenValues(tabComponent) as { title?: string }),
  //     id: tabComponent._id as string,
  //   }));
  // }, [component?.slots?.tabItems]);

  // useEffect(() => {
  //   if (!tabItems.length) return;
  //   if (!activeTabId) setActiveTabId(tabItems[0]?.id || '');
  // }, [tabItems, activeTabId]);

  // const handleContextualEditingTabClick = useCallback(
  //   (tabId: string) => {
  //     if (!context.isContextualEditing) return;

  //     setActiveTabId(tabId);
  //   },
  //   [context.isContextualEditing]
  // );

  // return (
  //   <Container className="flex flex-col gap-5" {...{ backgroundColor, spacing, border, fluidContent, height }}>
  //     <div className={getButtonContainerClasses({ color, variant })}>
  //       {tabItems.map((tabItem, index) => (
  //         <button
  //           key={tabItem.id}
  //           onClick={() => setActiveTabId(tabItem.id)}
  //           className={getButtonClasses({ color, variant, tabItem, activeTabId })}
  //         >
  //           {component?.slots?.tabItems?.[index] && (
  //             <UniformText
  //               onFocus={() => handleContextualEditingTabClick(tabItem.id)}
  //               context={context}
  //               parameter={parameters.text as any}
  //               component={component?.slots?.tabItems[index]}
  //               placeholder="Tab title"
  //             />
  //           )}
  //         </button>
  //       ))}
  //     </div>
  //     <UniformSlot data={component} context={context} slot={slots.tabItems}>
  //       {({ child, component: { _id: currentComponentId } }) =>
  //         currentComponentId === activeTabId ? (
  //           <Fragment key={currentComponentId}>{child}</Fragment>
  //         ) : (
  //           <Fragment key={currentComponentId} />
  //         )
  //       }
  //     </UniformSlot>
  //   </Container>
  // );
};

export default withFlattenParameters(Tabs);

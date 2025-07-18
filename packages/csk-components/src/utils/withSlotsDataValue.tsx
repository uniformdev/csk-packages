import { ComponentType, FC } from 'react';
import { ComponentInstance } from '@uniformdev/canvas';
import { ComponentProps } from '@/types/cskTypes';
import { getSlotComponents } from '@/utils/getSlotComponents';

export const withSlotsDataValue = <T,>(
  WrappedComponent: ComponentType<
    ComponentProps<T> & {
      slotData?: Record<string, ComponentInstance[]>;
    }
  >,
  withSlotData?: string[]
): ComponentType<ComponentProps<T>> => {
  const ComponentWithContainer: FC<ComponentProps<T>> = props => {
    const slotData = withSlotData?.reduce<Record<string, ComponentInstance[]>>((acc, slotName) => {
      const slot = props.slots[slotName];
      if (slot) {
        return {
          ...acc,
          [slotName]: getSlotComponents(slot, props.context).filter(i => i !== null),
        };
      }
      return acc;
    }, {});

    return <WrappedComponent {...props} slotData={slotData} />;
  };

  ComponentWithContainer.displayName = `withSlotsDataValue(${
    WrappedComponent.displayName || WrappedComponent.name || 'Component'
  })`;

  return ComponentWithContainer;
};

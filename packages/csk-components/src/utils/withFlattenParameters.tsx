import { ComponentType, FC } from 'react';
import { DataWithProperties, flattenValues } from '@uniformdev/canvas';
import { ComponentProps } from '@/types/cskTypes';

export const withFlattenParameters = <T, P>(
  WrappedComponent: ComponentType<ComponentProps<T>>
): ComponentType<ComponentProps<T> & P> => {
  const ComponentWithContainer: FC<ComponentProps<T> & P> = props => {
    const parameters = flattenValues(props as unknown as DataWithProperties) as P;
    return <WrappedComponent {...parameters} {...props} />;
  };

  ComponentWithContainer.displayName = `withFlattenParameters(${
    WrappedComponent.displayName || WrappedComponent.name || 'Component'
  })`;

  return ComponentWithContainer;
};

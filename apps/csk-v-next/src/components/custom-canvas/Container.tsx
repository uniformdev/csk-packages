import { FC } from 'react';
import {
  Container as CSKContainer,
  ContainerProps as CSKContainerProps,
} from '@uniformdev/csk-components/components/canvas';
import { cn } from '@uniformdev/csk-components/utils/styling';

type ContainerProps = CSKContainerProps & {
  fitContent?: boolean;
  relative?: boolean;
  absolute?: boolean;
};

// This is an example of how you can override an existing CSK component based on the Container component.
const Container: FC<ContainerProps> = ({ fitContent, relative, absolute, ...props }) => (
  <CSKContainer
    {...props}
    className={cn({ 'absolute inset-0 size-full': absolute }, { 'w-fit h-fit': fitContent, relative: relative })}
  />
);

export default Container;

import { FC } from 'react';
import { ComponentProps } from '@uniformdev/canvas-react';
import {
  Container as CSKContainer,
  ContainerParameters as CSKContainerParameters,
} from '@uniformdev/csk-components/components/canvas';
import { cn } from '@uniformdev/csk-components/utils/styling';

type ContainerProps = ComponentProps<
  CSKContainerParameters & {
    fitContent?: boolean;
    relative?: boolean;
  }
>;

// This is an example of how you can override an existing CSK component based on the Container component.
const Container: FC<ContainerProps> = ({ fitContent, relative, ...props }) => (
  <CSKContainer {...props} className={cn({ 'w-fit h-fit': fitContent, relative: relative })} />
);

export default Container;

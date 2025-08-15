import { FC } from 'react';
import {
  Container as CSKContainer,
  ContainerProps as CSKContainerProps,
} from '@uniformdev/csk-components/components/canvas/serverClient';
import { cn } from '@uniformdev/csk-components/utils/styling';
import { withFlattenParameters } from '@uniformdev/csk-components/utils/withFlattenParameters';

type ContainerProps = CSKContainerProps & {
  fitContent?: boolean;
  relative?: boolean;
};

// This is an example of how you can override an existing CSK component based on the Container component.
const Container: FC<ContainerProps> = ({ fitContent, relative, ...props }) => (
  <CSKContainer {...props} className={cn({ 'w-fit h-fit': fitContent, relative: relative })} />
);

export default withFlattenParameters(Container);

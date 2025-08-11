import { FC } from 'react';
import { UniformSlot } from '@uniformdev/canvas-react';
import { ContainerSlots } from '@/new-components/canvas/Container';
import BaseContainer from '@/new-components/ui/Container';
import { ContainerProps } from '.';

const Container: FC<ContainerProps> = ({
  displayName,
  anchor: id,
  backgroundColor,
  spacing,
  border,
  fluidContent,
  height,
  className,
}) => (
  <BaseContainer
    {...{
      title: displayName,
      id,
      backgroundColor,
      spacing,
      border,
      fluidContent,
      height,
      className,
    }}
  >
    <UniformSlot name={ContainerSlots.ContainerContent} />
  </BaseContainer>
);

export default Container;

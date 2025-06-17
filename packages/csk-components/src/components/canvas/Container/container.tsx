import { FC } from 'react';
import { UniformSlot } from '@uniformdev/canvas-next-rsc/component';
import BaseContainer from '@/components/ui/Container';
import { ContainerProps } from '.';

export const Container: FC<ContainerProps> = ({
  displayName,
  anchor: id,
  slots,
  component,
  context,
  backgroundColor,
  spacing,
  border,
  fluidContent,
  fullHeight,
  fitHeight,
  className,
}) => (
  <BaseContainer
    {...{ title: displayName, id, backgroundColor, spacing, border, fluidContent, fullHeight, fitHeight, className }}
  >
    <UniformSlot data={component} context={context} slot={slots.containerContent} />
  </BaseContainer>
);

import { FC } from 'react';
import { ComponentProps, UniformSlot } from '@uniformdev/canvas-next-rsc/component';
import BaseContainer from '@/components/ui/Container';
import { SpaceType, ViewPort } from '@/types';

export type ContainerAdditionalProps = {
  className?: string;
};

export type ContainerParameters = {
  displayName?: string;
  anchor?: string;
  backgroundColor?: string;
  spacing?: SpaceType | ViewPort<SpaceType>;
  border?: string | ViewPort<string>;
  fluidContent?: boolean;
  fullHeight?: boolean;
};
export enum ContainerSlots {
  ContainerContent = 'containerContent',
}

export type ContainerProps = ComponentProps<ContainerParameters & ContainerAdditionalProps, ContainerSlots>;

const Container: FC<ContainerProps> = ({
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
  className,
}) => (
  <BaseContainer {...{ title: displayName, id, backgroundColor, spacing, border, fluidContent, fullHeight, className }}>
    <UniformSlot data={component} context={context} slot={slots.containerContent} />
  </BaseContainer>
);

export default Container;

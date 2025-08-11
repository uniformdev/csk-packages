import { FC } from 'react';
import { UniformSlot } from '@uniformdev/canvas-next-rsc-v2/component';
import BaseContainer from '@/new-components/ui/Container';
import { withFlattenParameters } from '@/utils/withFlattenParameters';
import { ContainerParameters, ContainerProps } from '.';

const Container: FC<ContainerProps & ContainerParameters> = ({
  displayName,
  anchor: id,
  slots,
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
    <UniformSlot slot={slots.containerContent} />
  </BaseContainer>
);

export default withFlattenParameters(Container);

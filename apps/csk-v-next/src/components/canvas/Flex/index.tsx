import { FC } from 'react';
import { ComponentProps, UniformSlot } from '@uniformdev/canvas-next-rsc/component';
import { ContainerParameters } from '@/components/canvas/Container';
import BaseFlex from '@/components/ui/Flex';
import { withPlaygroundWrapper } from '@/hocs';
import { ViewPort } from '@/types';

type Direction = 'row' | 'row-reverse' | 'col' | 'col-reverse';
type Justify = 'start' | 'end' | 'center' | 'between';
type AvailableGap = '2' | '8' | '16';
type Align = 'start' | 'end' | 'center' | 'stretch';

export type FlexAdditionalProps = {
  className?: string;
  wrapperClassName?: string;
};

export type FlexParameters = ContainerParameters & {
  direction?: Direction | ViewPort<Direction>;
  justifyContent?: Justify | ViewPort<Justify>;
  gap?: AvailableGap | ViewPort<AvailableGap>;
  alignItems?: Align | ViewPort<Align>;
};
enum FlexSlots {
  FlexItem = 'flexItem',
}

export type FlexProps = ComponentProps<FlexParameters & FlexAdditionalProps, FlexSlots>;

const Flex: FC<FlexProps> = ({
  direction,
  justifyContent,
  gap,
  alignItems,
  backgroundColor,
  spacing,
  border,
  fluidContent,
  fullHeight,
  slots,
  component,
  context,
  className,
  wrapperClassName,
}) => (
  <BaseFlex
    {...{
      direction,
      justifyContent,
      gap,
      alignItems,
      backgroundColor,
      spacing,
      border,
      fluidContent,
      fullHeight,
      wrapperClassName,
      className,
    }}
  >
    <UniformSlot data={component} context={context} slot={slots.flexItem} />
  </BaseFlex>
);

export default withPlaygroundWrapper(Flex);

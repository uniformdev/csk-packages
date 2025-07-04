import { ComponentProps } from '@uniformdev/canvas-next-rsc/component';
import { ContainerParameters } from '@/components/canvas/Container/parameters';
import { ViewPort } from '@/types/cskTypes';
import { Flex } from './flex';

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

export default Flex;

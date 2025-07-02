import { ContainerProps as BaseContainerProps } from '@/components/ui/Container';
import { ViewPort } from '@/types/cskTypes';

type Direction = 'row' | 'row-reverse' | 'col' | 'col-reverse';
type Justify = 'normal' | 'start' | 'end' | 'center' | 'between' | 'around' | 'evenly' | 'stretch';
type Align = 'start' | 'end' | 'center' | 'baseline' | 'stretch';

export type FlexProps = Pick<
  BaseContainerProps,
  | 'className'
  | 'wrapperClassName'
  | 'title'
  | 'backgroundColor'
  | 'spacing'
  | 'border'
  | 'fluidContent'
  | 'fullHeight'
  | 'fitHeight'
  | 'height'
  | 'children'
> & {
  direction?: Direction | ViewPort<Direction>;
  justifyContent?: Justify | ViewPort<Justify>;
  gap?: string | ViewPort<string>;
  alignItems?: Align | ViewPort<Align>;
};

export { Flex as default } from './flex';

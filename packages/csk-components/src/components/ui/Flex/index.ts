import DefaultTheme from 'tailwindcss/defaultTheme';
import { ViewPort } from '@uniformdev/csk-components/types/cskTypes';
import { ContainerProps } from '../Container';

type Direction = 'row' | 'row-reverse' | 'col' | 'col-reverse';
type Justify = 'normal' | 'start' | 'end' | 'center' | 'between' | 'around' | 'evenly' | 'stretch';
type FlexGap = keyof (typeof DefaultTheme)['spacing'];
type Align = 'start' | 'end' | 'center' | 'baseline' | 'stretch';

export type FlexProps = Pick<
  ContainerProps,
  | 'className'
  | 'wrapperClassName'
  | 'title'
  | 'backgroundColor'
  | 'spacing'
  | 'border'
  | 'fluidContent'
  | 'fullHeight'
  | 'children'
> & {
  direction?: Direction | ViewPort<Direction>;
  justifyContent?: Justify | ViewPort<Justify>;
  gap?: FlexGap | ViewPort<FlexGap>;
  alignItems?: Align | ViewPort<Align>;
};

export { Flex as default } from './flex';

import { DefaultTheme } from 'tailwindcss/types/generated/default-theme';
import { ContainerProps as BaseContainerProps } from '@/components/ui/Container';
import { ViewPort } from '@/types/cskTypes';

type Direction = 'row' | 'row-reverse' | 'col' | 'col-reverse';
type Justify = 'normal' | 'start' | 'end' | 'center' | 'between' | 'around' | 'evenly' | 'stretch';
type FlexGap = keyof DefaultTheme['spacing'];
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
  | 'children'
> & {
  direction?: Direction | ViewPort<Direction>;
  justifyContent?: Justify | ViewPort<Justify>;
  gap?: FlexGap | ViewPort<FlexGap>;
  alignItems?: Align | ViewPort<Align>;
};

export { Flex as default } from './flex';

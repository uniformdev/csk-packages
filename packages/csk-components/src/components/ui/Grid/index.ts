import DefaultTheme from 'tailwindcss/defaultTheme';
import { ViewPort } from '@uniformdev/csk-components/types/cskTypes';
import { ContainerProps } from '../Container';

type AvailableColumnsCount = keyof (typeof DefaultTheme)['gridTemplateColumns'];
type AvailableGap = keyof (typeof DefaultTheme)['spacing'];

export type GridProps = Pick<
  ContainerProps,
  'title' | 'backgroundColor' | 'spacing' | 'border' | 'fluidContent' | 'fullHeight' | 'children'
> & {
  columnsCount?: AvailableColumnsCount | ViewPort<AvailableColumnsCount>;
  gapY?: AvailableGap | ViewPort<AvailableGap>;
  gapX?: AvailableGap | ViewPort<AvailableGap>;
  className?: string;
};

export { Grid as default } from './grid';

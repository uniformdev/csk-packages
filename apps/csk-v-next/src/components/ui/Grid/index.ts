import { DefaultTheme } from 'tailwindcss/types/generated/default-theme';
import { ContainerProps as BaseContainerProps } from '@/components/ui/Container';
import { ViewPort } from '@/types/cskTypes';

type AvailableColumnsCount = keyof DefaultTheme['gridTemplateColumns'];
type AvailableGap = keyof DefaultTheme['spacing'];

export type GridProps = Pick<
  BaseContainerProps,
  'title' | 'backgroundColor' | 'spacing' | 'border' | 'fluidContent' | 'fullHeight' | 'children'
> & {
  columnsCount?: AvailableColumnsCount | ViewPort<AvailableColumnsCount>;
  gapY?: AvailableGap | ViewPort<AvailableGap>;
  gapX?: AvailableGap | ViewPort<AvailableGap>;
  className?: string;
};

export { Grid as default } from './grid';

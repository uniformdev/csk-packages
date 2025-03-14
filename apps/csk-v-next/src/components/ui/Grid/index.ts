import { DefaultTheme } from 'tailwindcss/types/generated/default-theme';
import { ContainerProps as BaseContainerProps } from '@/components/ui/Container';
import { ViewPort } from '@/types/cskTypes';

type AvailableColumnsCount = keyof DefaultTheme['gridTemplateColumns'];
type AvailableGap = keyof DefaultTheme['spacing'];
type AvailableAlignItems = 'start' | 'center' | 'end';

export type GridProps = Pick<
  BaseContainerProps,
  'title' | 'backgroundColor' | 'spacing' | 'border' | 'fluidContent' | 'fullHeight' | 'children'
> & {
  columnsCount?: AvailableColumnsCount | ViewPort<AvailableColumnsCount>;
  gapY?: AvailableGap | ViewPort<AvailableGap>;
  gapX?: AvailableGap | ViewPort<AvailableGap>;
  className?: string;
  alignItems?: AvailableAlignItems | ViewPort<AvailableAlignItems>;
};

export { Grid as default } from './grid';

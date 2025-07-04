import { ContainerProps as BaseContainerProps } from '@/components/ui/Container';
import { ViewPort } from '@/types/cskTypes';

export type GridProps = Pick<
  BaseContainerProps,
  'title' | 'backgroundColor' | 'spacing' | 'border' | 'fluidContent' | 'children' | 'height'
> & {
  columnsCount?: string | ViewPort<string>;
  gapY?: string | ViewPort<string>;
  gapX?: string | ViewPort<string>;
  className?: string;
};

export { Grid as default } from './grid';

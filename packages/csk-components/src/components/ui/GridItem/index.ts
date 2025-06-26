import { HTMLAttributes } from 'react';
import { ViewPort } from '@/types/cskTypes';

export type GridItemProps = HTMLAttributes<HTMLDivElement> & {
  columnStart?: string | ViewPort<string>;
  columnSpan?: string | ViewPort<string>;
  rowStart?: string | ViewPort<string>;
  rowSpan?: string | ViewPort<string>;
  className?: string;
};

export { GridItem as default } from './grid-item';

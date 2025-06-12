import { ReactElement } from 'react';
import dynamic from 'next/dynamic';
import { ContainerProps as BaseContainerProps } from '@/components/ui/Container';

export type CarouselProps = Pick<
  BaseContainerProps,
  'title' | 'backgroundColor' | 'spacing' | 'border' | 'fluidContent' | 'fullHeight'
> & {
  countOfItems?: number;
  children: (options: { className?: string; style?: React.CSSProperties }) => ReactElement;
  itemsPerPage?: string;
  gapX?: string;

  arrowColor?: string;
  arrowBackgroundColor?: string;

  variant?: string;
};

export default dynamic(() => import('./carousel').then(mod => mod.Carousel));

import { ReactElement } from 'react';
import dynamic from 'next/dynamic';
import { ContainerProps as BaseContainerProps } from '@/components/ui/Container';

export type CarouselProps = Pick<
  BaseContainerProps,
  'title' | 'backgroundColor' | 'spacing' | 'border' | 'fluidContent' | 'fullHeight'
> & {
  countOfItems?: number;
  children: ReactElement | ReactElement[];
};

export default dynamic(() => import('./carousel').then(mod => mod.Carousel));

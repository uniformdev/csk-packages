import { ReactElement } from 'react';
import dynamic from 'next/dynamic';
import { ContainerProps } from '@uniformdev/csk-components/components/ui';

export type CarouselProps = Pick<
  ContainerProps,
  'title' | 'backgroundColor' | 'spacing' | 'border' | 'fluidContent' | 'fullHeight'
> & {
  countOfItems?: number;
  children: ReactElement | ReactElement[];
};

export default dynamic(() => import('./carousel').then(mod => mod.Carousel));

import { ReactElement } from 'react';
import { ContainerProps } from '../Container';

export type CarouselProps = Pick<
  ContainerProps,
  'title' | 'backgroundColor' | 'spacing' | 'border' | 'fluidContent' | 'fullHeight'
> & {
  countOfItems?: number;
  children: ReactElement | ReactElement[];
};

export { Carousel as default } from './Carousel';

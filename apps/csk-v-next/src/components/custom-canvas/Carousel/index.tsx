import dynamic from 'next/dynamic';
import { ComponentProps } from '@uniformdev/canvas-next-rsc/component';
import { ContainerParameters } from '@/components/canvas/Container/parameters';

export type CarouselParameters = ContainerParameters & {
  iconColor?: string;
  autoPlay?: boolean;
  countOfItems?: number;
};

export enum CarouselSlots {
  Items = 'carouselItems',
}

export type CarouselProps = ComponentProps<CarouselParameters, CarouselSlots>;

export default dynamic(() => import('./carousel').then(mod => mod.Carousel));
export { CarouselEmptyPlaceholder } from './empty-placeholder';

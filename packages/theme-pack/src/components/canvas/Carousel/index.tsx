import dynamic from 'next/dynamic';
import { ComponentProps } from '@uniformdev/canvas-next-rsc/component';
import { ContainerParameters } from '@uniformdev/theme-pack/components/canvas';

export type CarouselParameters = ContainerParameters;

export enum CarouselSlots {
  Items = 'carouselItems',
}

export type CarouselProps = ComponentProps<CarouselParameters, CarouselSlots>;

export default dynamic(() => import('./carousel').then(mod => mod.Carousel));
export { CarouselEmptyPlaceholder } from './empty-placeholder';

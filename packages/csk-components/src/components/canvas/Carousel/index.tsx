import dynamic from 'next/dynamic';
import { ContainerParameters } from '@/components/canvas/Container/parameters';
import { ComponentProps } from '@/types/cskTypes';

export type CarouselParameters = ContainerParameters & {
  itemsPerPage?: string;
  gapX?: string;
};

export enum CarouselSlots {
  Items = 'carouselItems',
}

export type CarouselProps = ComponentProps<CarouselParameters, CarouselSlots>;

export default dynamic(() => import('./carousel').then(mod => mod.default));
export { CarouselEmptyPlaceholder } from './empty-placeholder';

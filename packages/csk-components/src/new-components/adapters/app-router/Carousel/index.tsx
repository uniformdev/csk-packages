import dynamic from 'next/dynamic';
import { CarouselParameters, CarouselSlots } from '@/new-components/canvas/Carousel';
import { ComponentProps } from '@/types/canvasTypes';

export type CarouselProps = ComponentProps<CarouselParameters, CarouselSlots>;

export default dynamic(() => import('./carousel').then(mod => mod.default));
export { carouselEmptyPlaceholderWrapper } from './empty-placeholder';

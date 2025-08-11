import { CarouselSlots } from '@/new-components/canvas/Carousel';
import { CarouselEmptyPlaceholder } from '@/new-components/canvas/Carousel/empty-placeholder';
import { ResolveEmptyPlaceholderOptions } from '@/types/cskTypes';

export const carouselEmptyPlaceholderWrapper = (props: ResolveEmptyPlaceholderOptions) => {
  return { component: () => <CarouselEmptyPlaceholder slotName={props.slotName as CarouselSlots} /> };
};

import { ContainerParameters } from '@/new-components/canvas/Container';

export type CarouselParameters = ContainerParameters & {
  itemsPerPage?: string;
  gapX?: string;
};

export enum CarouselSlots {
  Items = 'carouselItems',
}

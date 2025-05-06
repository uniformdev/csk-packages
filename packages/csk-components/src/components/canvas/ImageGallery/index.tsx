import dynamic from 'next/dynamic';
import { AssetParamValue } from '@uniformdev/assets';
import { ComponentProps } from '@uniformdev/canvas-next-rsc/component';
import { ContainerParameters } from '@/components/canvas/Container/parameters';

export type ImageGalleryParameters = ContainerParameters & {
  aspectRatio?: 'square' | 'video';
  items?: AssetParamValue;
};

export enum ImageGallerySlots {
  Items = 'imageGalleryItems',
}

export type ImageGalleryProps = ComponentProps<
  ImageGalleryParameters & {
    config?: {
      firstLineCount: number;
      secondLineCount: number;
      otherLinesCount: number;
    };
  },
  ImageGallerySlots
>;

export default dynamic(() => import('./image-gallery').then(mod => mod.ImageGallery));
export { ImageGalleryEmptyPlaceholder } from './empty-placeholder';

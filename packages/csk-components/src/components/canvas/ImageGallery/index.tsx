import dynamic from 'next/dynamic';
import { AssetParamValue } from '@uniformdev/assets';
import { ContainerParameters } from '@/new-components/canvas/Container';
import { ComponentProps } from '@/types/canvasTypes';

export type ImageGalleryParameters = ContainerParameters & {
  aspectRatio?: 'square' | 'video';
  items?: AssetParamValue;
};

export type ImageGalleryAdditionalProps = {
  config?: {
    firstLineCount: number;
    secondLineCount: number;
    otherLinesCount: number;
  };
};

export enum ImageGallerySlots {
  Items = 'imageGalleryItems',
}

export type ImageGalleryProps = ComponentProps<ImageGalleryParameters, ImageGallerySlots> & ImageGalleryAdditionalProps;

export default dynamic(() => import('./image-gallery').then(mod => mod.default));
export { ImageGalleryEmptyPlaceholder } from './empty-placeholder';

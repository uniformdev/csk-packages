import { AssetParamValue } from '@uniformdev/assets';
import { ComponentProps } from '@uniformdev/canvas-next-rsc/component';
import { ViewPort } from '@/types/cskTypes';

export type ImageParameters = {
  image?: AssetParamValue;
  width?: number;
  height?: number;
  objectFit?: 'fill' | 'contain' | 'cover' | 'none' | 'scale-down';
  overlayColor?: string;
  overlayOpacity?: string;
  border?: string | ViewPort<string>;
  priority?: boolean;
  unoptimized?: boolean;
  fill?: boolean;
};

export type ImageProps = ComponentProps<ImageParameters>;

export { Image as default } from './image';

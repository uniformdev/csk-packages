import { AssetParamValue } from '@uniformdev/assets';
import { LinkParamValue } from '@uniformdev/canvas';
import { ComponentProps } from '@uniformdev/canvas-next-rsc/component';
import { ViewPort } from '@/types/cskTypes';

export type VideoParameters = {
  video?: AssetParamValue;
  url?: LinkParamValue; // Deprecated. Please use video parameter instead of url
  placeholderImage?: AssetParamValue;
  autoPlay?: boolean;
  lazyLoad?: boolean;
  loop?: boolean;
  controls?: boolean;
  muted?: boolean;
  overlayColor?: string;
  overlayOpacity?: string;
  border?: string | ViewPort<string>;
};

export type VideoProps = ComponentProps<VideoParameters>;

export { Video as default } from './video';

import { Asset } from '@uniformdev/assets';
import { LinkParamValue } from '@uniformdev/canvas';
import { ComponentProps } from '@uniformdev/canvas-next-rsc/component';

export type VideoParameters = {
  url?: LinkParamValue;
  placeholderImage?: Asset[];
  autoPlay?: boolean;
  lazyLoad?: boolean;
  loop?: boolean;
  controls?: boolean;
  muted?: boolean;
};

export type VideoProps = ComponentProps<VideoParameters>;

export { Video as default } from './video';

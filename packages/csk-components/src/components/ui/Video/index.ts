import dynamic from 'next/dynamic';
import { ImageProps as NextImageProps } from 'next/image';
import { ReactPlayerProps } from 'react-player/types';
import { ViewPort } from '@/types/cskTypes';

export type VideoProps = ReactPlayerProps & {
  autoPlay?: boolean;
  url?: string;
  lazyLoad?: boolean;
  placeholderImageUrl?: string;
  overlayColor?: string;
  overlayOpacity?: NonNullable<NextImageProps['style']>['opacity'];
  border?: string | ViewPort<string>;
};

export default dynamic(() => import('./video').then(mod => mod.Video));

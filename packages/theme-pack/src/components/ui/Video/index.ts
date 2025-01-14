import dynamic from 'next/dynamic';
import { ReactPlayerProps } from 'react-player';

export type VideoProps = ReactPlayerProps & {
  autoPlay?: boolean;
  lazyLoad?: boolean;
  placeholderImageUrl?: string;
};

export default dynamic(() => import('./video').then(mod => mod.Video));

import { ReactPlayerProps } from 'react-player';

export type VideoProps = ReactPlayerProps & {
  autoPlay?: boolean;
  lazyLoad?: boolean;
  placeholderImageUrl?: string;
};

export { Video as default } from './Video';

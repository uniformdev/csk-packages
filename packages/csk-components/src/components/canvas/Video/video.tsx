'use client';

import { FC } from 'react';
import BaseVideo from '@/components/ui/Video';
import { resolveAsset } from '@/utils/assets';
import { VideoProps } from '.';
import { VideoPlaceholder } from './placeholder';

export const Video: FC<VideoProps> = ({
  url,
  placeholderImage,
  autoPlay,
  lazyLoad,
  loop,
  controls,
  muted,
  overlayColor,
  overlayOpacity,
  border,
  component,
  context,
}) => {
  if (!url || url.type !== 'url' || !url.path) {
    return <VideoPlaceholder component={component} context={context} />;
  }

  const [resolvedImage] = resolveAsset(placeholderImage);

  return (
    <BaseVideo
      url={url.path}
      placeholderImageUrl={resolvedImage?.url}
      {...{ autoPlay, lazyLoad, loop, controls, muted, overlayColor, overlayOpacity, border }}
    />
  );
};

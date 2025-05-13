'use client';

import { FC } from 'react';
import BaseVideo from '@/components/ui/Video';
import { resolveAsset } from '@/utils/assets';
import { VideoProps } from '.';
import { VideoPlaceholder } from './placeholder';

export const Video: FC<VideoProps> = ({
  video,
  url, // Deprecated. Please use video parameter instead of url
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
  console.info('video', JSON.stringify(video, null, 2));
  const [resolvedVideo] = resolveAsset(video);
  const [resolvedImage] = resolveAsset(placeholderImage);

  const resolvedVideoUrl = resolvedVideo?.url || (url?.type === 'url' ? url.path : undefined);

  if (!resolvedVideoUrl) {
    return <VideoPlaceholder component={component} context={context} />;
  }

  return (
    <BaseVideo
      url={resolvedVideoUrl}
      placeholderImageUrl={resolvedImage?.url}
      {...{ autoPlay, lazyLoad, loop, controls, muted, overlayColor, overlayOpacity, border }}
    />
  );
};

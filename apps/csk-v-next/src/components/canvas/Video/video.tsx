'use client';

import { FC } from 'react';
import { flattenValues } from '@uniformdev/canvas';
import BaseVideo from '@/components/ui/Video';
import { resolveAsset } from '@/utils/assets';
import { VideoProps } from '.';
import { VideoPlaceholder } from './placeholder';

export const Video: FC<VideoProps> = ({
  url,
  videoAsset,
  placeholderImage,
  autoPlay,
  lazyLoad,
  loop,
  controls,
  muted,
  component,
  context,
}) => {
  const videoUrl = url?.path || flattenValues(videoAsset, { toSingle: true })?.url;

  if (!videoUrl) {
    return <VideoPlaceholder component={component} context={context} />;
  }

  const [resolvedImage] = resolveAsset(placeholderImage);

  return (
    <BaseVideo
      url={videoUrl}
      placeholderImageUrl={resolvedImage?.url}
      {...{ autoPlay, lazyLoad, loop, controls, muted }}
    />
  );
};

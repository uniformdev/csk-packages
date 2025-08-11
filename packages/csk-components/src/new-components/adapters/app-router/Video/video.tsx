'use client';

import { FC } from 'react';
import { VideoParameters } from '@/new-components/canvas/Video';
import { VideoPlaceholder } from '@/new-components/canvas/Video/placeholder';
import BaseVideo from '@/new-components/ui/Video';
import { ReplaceFieldsWithAssets } from '@/types/cskTypes';
import { withFlattenParameters } from '@/utils/withFlattenParameters';
import { VideoProps } from '.';

const Video: FC<VideoProps & ReplaceFieldsWithAssets<VideoParameters, 'video' | 'placeholderImage'>> = ({
  video,
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
  const [resolvedVideo] = video || [];
  const [resolvedImage] = placeholderImage || [];

  const resolvedVideoUrl = resolvedVideo?.url;

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

export default withFlattenParameters(Video);

import { FC } from 'react';
import { VideoPlaceholder } from '@/new-components/canvas/Video/placeholder';
import BaseVideo from '@/new-components/ui/Video';
import { resolveAsset } from '@/utils/assets';
import { VideoProps } from '.';

const Video: FC<VideoProps> = ({
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
}) => {
  const [resolvedVideo] = resolveAsset(video);
  const [resolvedImage] = resolveAsset(placeholderImage);

  const resolvedVideoUrl = resolvedVideo?.url;

  if (!resolvedVideoUrl) {
    return <VideoPlaceholder component={component} />;
  }

  return (
    <BaseVideo
      url={resolvedVideoUrl}
      placeholderImageUrl={resolvedImage?.url}
      {...{ autoPlay, lazyLoad, loop, controls, muted, overlayColor, overlayOpacity, border }}
    />
  );
};

export default Video;

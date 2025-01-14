'use client';

import { FC } from 'react';
import { Video as BaseVideo } from '@uniformdev/theme-pack/components/ui';
import { resolveAsset } from '@uniformdev/theme-pack/utils/assets';
import { VideoProps } from './index';
import { VideoPlaceholder } from './placeholder';

export const Video: FC<VideoProps> = ({
  url,
  placeholderImage,
  autoPlay,
  lazyLoad,
  loop,
  controls,
  muted,
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
      {...{ autoPlay, lazyLoad, loop, controls, muted }}
    />
  );
};

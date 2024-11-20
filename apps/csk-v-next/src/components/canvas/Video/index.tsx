'use client';
import { FC } from 'react';
import { Asset } from '@uniformdev/assets';
import { LinkParamValue } from '@uniformdev/canvas';
import { ComponentProps } from '@uniformdev/canvas-next-rsc/component';
import MediaPlaceholder from '@/components/ui/MediaPlaceholder';
import BaseVideo from '@/components/ui/Video';
import { resolveAsset } from '@/utils';

export type VideoParameters = {
  url?: LinkParamValue;
  placeholderImage?: Asset[];
  autoPlay?: boolean;
  lazyLoad?: boolean;
  loop?: boolean;
  controls?: boolean;
  muted?: boolean;
};

type VideoProps = ComponentProps<VideoParameters>;

const Video: FC<VideoProps> = ({
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
    const isEditorPreviewMode = context.previewMode === 'editor';
    const isPlaceholder = component?._id?.includes('placeholder_');

    if (!isEditorPreviewMode || isPlaceholder) {
      return null;
    }

    return <MediaPlaceholder type="video" placeholder="Please add video link to display a video" />;
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

export default Video;

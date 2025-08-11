import { FC } from 'react';
import MediaPlaceholder from '@/new-components/ui/MediaPlaceholder';
import { VideoProps } from '@/new-components/ui/Video';

type VideoPlaceholderProps = Pick<VideoProps, 'component' | 'context'>;

export const VideoPlaceholder: FC<VideoPlaceholderProps> = ({ context, component }) => {
  const isEditorPreviewMode = context.isContextualEditing;
  const isPlaceholder = component?._id?.includes('placeholder_');

  if (!isEditorPreviewMode || isPlaceholder) {
    return null;
  }

  return <MediaPlaceholder type="video" placeholder="Please add video link to display a video" />;
};

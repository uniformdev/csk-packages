import { FC } from 'react';
import MediaPlaceholder from '@/components/ui/MediaPlaceholder';
import { ImageProps } from '.';

type ImagePlaceholderProps = Pick<ImageProps, 'component' | 'context' | 'width' | 'height'>;

export const ImagePlaceholder: FC<ImagePlaceholderProps> = ({ context, component, width, height }) => {
  const isEditorPreviewMode = context.previewMode === 'editor' && context.isContextualEditing;
  const isPlaceholder = component?._id?.includes('placeholder_');

  if (!isEditorPreviewMode || isPlaceholder) {
    return null;
  }

  return (
    <div style={{ width: width ? `${width}px` : 'auto', height: height ? `${height}px` : 'auto' }}>
      <MediaPlaceholder type="image" placeholder="Please add an asset to display an image" />
    </div>
  );
};

import { FC } from 'react';
import { imageFrom } from '@uniformdev/assets';
import BaseImage from '@/components/ui/Image';
import MediaPlaceholder from '@/components/ui/MediaPlaceholder';
import { resolveAsset } from '@/utils/assets';
import { ImageProps } from '.';

export const Image: FC<ImageProps> = async ({
  image,
  objectFit,
  width,
  height,
  overlayColor,
  overlayOpacity,
  border,
  priority,
  fill,
  unoptimized,
  context,
  component,
}) => {
  const [resolvedImage] = resolveAsset(image);

  if (!resolvedImage) {
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
  }

  const { focalPoint, title = '' } = resolvedImage;

  const imageWidth = width || resolvedImage.width;
  const imageHeight = height || resolvedImage.height;

  if (!fill && (!imageWidth || !imageHeight)) {
    console.warn(
      'No dimensions provided for the Next.js Image component. Falling back to a standard <img> tag for rendering.'
    );
    return <img src={resolvedImage.url} alt={title} />;
  }

  const imageUrl = imageFrom(resolvedImage?.url)
    .transform({
      width: width,
      height: height,
      fit: objectFit,
      focal: focalPoint,
    })
    .url();

  const variantBasedProps = fill
    ? { fill: true }
    : {
        width: imageWidth,
        height: imageHeight,
      };

  return (
    <BaseImage
      src={imageUrl}
      alt={title}
      unoptimized={unoptimized}
      priority={priority}
      sizes="100%"
      style={{ objectFit }}
      overlayColor={overlayColor}
      overlayOpacity={overlayOpacity}
      border={border}
      {...variantBasedProps}
    />
  );
};

import { FC } from 'react';
import { imageFrom } from '@uniformdev/assets';
import BaseImage from '@/components/ui/Image';
import { resolveAsset } from '@/utils/assets';
import { ImageProps } from '.';
import { ImagePlaceholder } from './placeholder';

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
    return <ImagePlaceholder context={context} component={component} width={width} height={height} />;
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

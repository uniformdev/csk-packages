import { FC } from 'react';
import probe from 'probe-image-size';
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
  unoptimized,
  context,
  component,
}) => {
  const isFill = component.variant === 'fill';

  const [resolvedImage] = resolveAsset(image);

  if (!resolvedImage) {
    return <ImagePlaceholder context={context} component={component} width={width} height={height} />;
  }

  const { focalPoint, title = '' } = resolvedImage;

  const imageWidth = width || resolvedImage.width;
  const imageHeight = height || resolvedImage.height;

  const fallbackSize =
    (!imageWidth || !imageHeight) && resolvedImage.url
      ? await probe(resolvedImage.url).catch(() => ({ width: undefined, height: undefined }))
      : { width: undefined, height: undefined };

  const imageUrl = imageFrom(resolvedImage?.url)
    .transform({
      width: width,
      height: height,
      fit: objectFit,
      focal: focalPoint,
    })
    .url();

  const variantBasedProps = isFill
    ? { fill: true }
    : {
        width: imageWidth || fallbackSize.width,
        height: imageHeight || fallbackSize.height,
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

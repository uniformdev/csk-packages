import { FC } from 'react';
import { imageFrom } from '@uniformdev/assets';
import BaseImage from '@/components/ui/Image';
import { resolveAsset } from '@/utils/assets';
import { ImageProps } from '.';
import { ImagePlaceholder } from './placeholder';

export const Image: FC<ImageProps> = ({
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
  const isBackground = component.variant === 'background';

  const [resolvedImage] = resolveAsset(image);

  if (!resolvedImage) {
    return <ImagePlaceholder context={context} component={component} width={width} height={height} />;
  }

  const { focalPoint, title = '' } = resolvedImage;

  const imageUrl = imageFrom(resolvedImage?.url)
    .transform({
      width: width,
      height: height,
      fit: objectFit,
      focal: focalPoint,
    })
    .url();

  const variantBasedProps = isBackground
    ? { fill: true }
    : { width: width || resolvedImage.width, height: height || resolvedImage.height };

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

import { FC } from 'react';
import { Image as BaseImage } from '@uniformdev/theme-pack/components/ui';
import { resolveAsset } from '@uniformdev/theme-pack/utils/assets';
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
  const [resolvedImage] = resolveAsset(image);

  if (!resolvedImage) {
    return <ImagePlaceholder context={context} component={component} width={width} height={height} />;
  }

  const { url, title = '' } = resolvedImage;

  return (
    <BaseImage
      containerStyle={{ ...(width ? { width: `${width}px` } : {}), ...(height ? { height: `${height}px` } : {}) }}
      src={url}
      alt={title}
      fill
      unoptimized={unoptimized}
      priority={priority}
      sizes="100%"
      style={{ objectFit }}
      overlayColor={overlayColor}
      overlayOpacity={overlayOpacity}
      border={border}
    />
  );
};

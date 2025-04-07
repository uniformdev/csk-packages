import { FC } from 'react';
import BaseImage from '@/components/ui/Image';
// import { getResizedAssetUrl, FIT_OPTIONS } from '@/utils/assetFocalPoint';
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
  const [resolvedImage] = resolveAsset(image);

  if (!resolvedImage) {
    return <ImagePlaceholder context={context} component={component} width={width} height={height} />;
  }

  const { url, title = '' } = resolvedImage;
  //const imageUrl = getResizedAssetUrl(url, width!, height!, width!, height!, FIT_OPTIONS.COVER, focalPoint) || url;

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

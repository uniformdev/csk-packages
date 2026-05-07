import { FC } from 'react';
import NextImage from 'next/image';
import { resolveColor } from '@/utils/colorPalette';
import { cn, resolveViewPort } from '@/utils/styling';
import { ImageProps } from './';

export const Image: FC<ImageProps> = ({
  containerStyle,
  overlayColor,
  contrastBaseColor,
  overlayOpacity,
  border = '',
  style: imageStyle,
  ...nextImageStyle
}) => {
  const overlay = resolveColor(overlayColor || contrastBaseColor, 'background');
  return (
    <div className={cn('relative', { 'size-full': nextImageStyle.fill })} style={containerStyle}>
      <NextImage
        {...nextImageStyle}
        className={cn({
          [resolveViewPort(border, '{value}')]: border,
        })}
        style={{ ...imageStyle }}
      />
      <div
        className={cn('absolute bottom-0 left-0 right-0 top-0', overlay.className, {
          [resolveViewPort(border, '{value}')]: border,
        })}
        style={{
          ...overlay.style,
          opacity: overlayOpacity || 0,
          ...(contrastBaseColor && !overlayColor ? { filter: 'grayscale(100%) invert(100%)' } : {}),
        }}
      />
    </div>
  );
};

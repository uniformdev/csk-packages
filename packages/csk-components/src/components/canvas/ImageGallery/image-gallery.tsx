'use client';

import { FC } from 'react';
import { UniformSlot } from '@uniformdev/canvas-next-rsc/component';
import Container from '@/components/ui/Container';
import BaseImage from '@/components/ui/Image';
import { resolveAsset } from '@/utils/assets';
import { ImageGalleryProps } from '.';
import { GalleryInner } from './gallery-inner';

export const ImageGallery: FC<ImageGalleryProps> = ({
  slots,
  aspectRatio,
  items,
  backgroundColor,
  spacing,
  border,
  fluidContent,
  fullHeight,
  fitHeight,
  config,
  context,
  component,
}) => {
  const slotsToRender = !items?.length
    ? slots.imageGalleryItems
    : {
        name: 'items',
        items:
          resolveAsset(items)?.map((image, index) => (
            <BaseImage
              key={image?.id || `image-${index}`}
              src={image.url}
              style={{ objectFit: 'cover' }}
              alt={`Image ${index}`}
              fill
            />
          )) || [],
      };

  const showEmptySlot =
    !items?.length &&
    !(component?.slots?.imageGalleryItems as { _id?: string }[])?.filter(({ _id }) => !_id?.startsWith('placeholder'))
      ?.length;

  return (
    <Container {...{ backgroundColor, spacing, border, fluidContent, fullHeight, fitHeight }}>
      <div className="flex flex-col gap-1">
        {showEmptySlot ? (
          <UniformSlot context={context} slot={slots.imageGalleryItems} data={component} />
        ) : (
          <GalleryInner slot={slotsToRender} aspectRatio={aspectRatio} config={config} />
        )}
      </div>
    </Container>
  );
};

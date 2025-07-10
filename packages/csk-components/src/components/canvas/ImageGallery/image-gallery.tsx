'use client';

import { FC } from 'react';
import Container from '@/components/ui/Container';
import BaseImage from '@/components/ui/Image';
import { ReplaceFieldsWithAssets } from '@/types/cskTypes';
import { withFlattenParameters } from '@/utils/withFlattenParameters';
import { ImageGalleryParameters, ImageGalleryProps } from '.';
import { GalleryInner } from './gallery-inner';

const ImageGallery: FC<ImageGalleryProps & ReplaceFieldsWithAssets<ImageGalleryParameters, 'items'>> = ({
  slots,
  backgroundColor,
  spacing,
  border,
  fluidContent,
  height,
  aspectRatio,
  config,
  items,
}) => {
  const slotsToRender = {
    ...slots.imageGalleryItems,
    items: !items?.length
      ? slots.imageGalleryItems.items
      : items.map((item, index) => ({
          _id: `image-${index}-${item?.id}`,
          component: <BaseImage src={item.url} alt={item.title || ''} style={{ objectFit: 'cover' }} fill />,
          $pzCrit: undefined,
        })),
  };

  return (
    <Container {...{ backgroundColor, spacing, border, fluidContent, height }}>
      <div className="flex flex-col gap-1">
        <GalleryInner slot={slotsToRender} aspectRatio={aspectRatio} config={config} />
      </div>
    </Container>
  );
};

export default withFlattenParameters(ImageGallery);

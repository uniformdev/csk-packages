'use client';

import { FC, ReactNode } from 'react';
import Masonry from 'react-responsive-masonry';
import { Asset } from '@uniformdev/assets';
import { ComponentProps, UniformSlotProps } from '@uniformdev/canvas-next-rsc/component';
import { ContainerParameters } from '@/components/canvas/Container';
import Container from '@/components/ui/Container';
import BaseImage from '@/components/ui/Image';
import { cn, resolveAsset } from '@/utils';

const DEFAULT_GALLERY_CONFIG = {
  firstLineCount: 2,
  secondLineCount: 3,
  otherLinesCount: 4,
};

export type ImageGalleryParameters = ContainerParameters & {
  aspectRatio?: 'square' | 'video';
  items?: Asset[];
};
enum ImageGallerySlots {
  Items = 'imageGalleryItems',
}

type ImageGalleryProps = ComponentProps<
  ImageGalleryParameters & {
    config?: {
      firstLineCount: number;
      secondLineCount: number;
      otherLinesCount: number;
    };
  },
  ImageGallerySlots
>;

const ImageGallery: FC<ImageGalleryProps> = ({
  slots,
  aspectRatio,
  items,
  backgroundColor,
  spacing,
  border,
  fluidContent,
  fullHeight,
  config,
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

  return (
    <Container {...{ backgroundColor, spacing, border, fluidContent, fullHeight }}>
      <div className="flex flex-col gap-1">
        <GalleryInner slot={slotsToRender} aspectRatio={aspectRatio} config={config} />
      </div>
    </Container>
  );
};

type GalleryInnerProps = {
  slot: UniformSlotProps['slot'];
  aspectRatio?: ImageGalleryProps['aspectRatio'];
  config?: ImageGalleryProps['config'];
};
const GalleryInner: FC<GalleryInnerProps> = ({ slot, aspectRatio, config }) => {
  const {
    firstLineCount = DEFAULT_GALLERY_CONFIG.firstLineCount,
    secondLineCount = DEFAULT_GALLERY_CONFIG.secondLineCount,
    otherLinesCount = DEFAULT_GALLERY_CONFIG.otherLinesCount,
  } = config || {};

  const { items = [] } = slot || {};

  const imagesGroups =
    items.reduce<ReactNode[][]>(
      (acc, item, index) => {
        if (index < firstLineCount) {
          acc[0].push(item);
        } else if (index < firstLineCount + secondLineCount) {
          acc[1].push(item);
        } else {
          acc[2].push(item);
        }
        return acc;
      },
      [[], [], []]
    ) || [];

  return (
    <>
      {imagesGroups?.map((images, lineIndex) =>
        images.length ? (
          <Masonry
            key={`line-${lineIndex}`}
            columnsCount={lineIndex < 2 || images.length < otherLinesCount ? images.length : otherLinesCount}
            gutter="4px"
          >
            {images.map((img, ImageIndex) => (
              <div
                key={`img-${ImageIndex}`}
                className={cn('flex flex-1 items-center justify-center', {
                  [`aspect-${aspectRatio}`]: !!aspectRatio,
                })}
              >
                {img}
              </div>
            ))}
          </Masonry>
        ) : null
      )}
    </>
  );
};
export default ImageGallery;

'use client';

import { FC, ReactNode } from 'react';
import Masonry from 'react-responsive-masonry';
import { UniformSlotProps } from '@uniformdev/canvas-next-rsc/component';
import { cn } from '@uniformdev/csk-components/utils/styling';
import { ImageGalleryProps } from '.';

const DEFAULT_GALLERY_CONFIG = {
  firstLineCount: 2,
  secondLineCount: 3,
  otherLinesCount: 4,
};

type GalleryInnerProps = {
  slot: UniformSlotProps['slot'];
  aspectRatio?: ImageGalleryProps['aspectRatio'];
  config?: ImageGalleryProps['config'];
};

export const GalleryInner: FC<GalleryInnerProps> = ({ slot, aspectRatio, config }) => {
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
          acc[0]?.push(item);
        } else if (index < firstLineCount + secondLineCount) {
          acc[1]?.push(item);
        } else {
          acc[2]?.push(item);
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

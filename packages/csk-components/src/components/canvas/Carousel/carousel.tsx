'use client';

import { FC } from 'react';
import { UniformSlot } from '@uniformdev/canvas-next-rsc/component';
import BaseCarousel from '@/components/ui/Carousel';
import { CarouselProps } from '.';

export const Carousel: FC<CarouselProps> = ({
  slots,
  component,
  context,
  backgroundColor,
  spacing,
  border,
  fluidContent,
  fullHeight,
  itemsPerPage,
  gapX,
}) => (
  <BaseCarousel
    {...{ backgroundColor, spacing, border, fluidContent, fullHeight, itemsPerPage, gapX }}
    countOfItems={slots.carouselItems?.items.length ?? 0}
    variant={component.variant}
  >
    {({ className, style }) => (
      <UniformSlot context={context} slot={slots.carouselItems} data={component}>
        {({ child, key }) => (
          <div key={key} className={className} style={style}>
            {child}
          </div>
        )}
      </UniformSlot>
    )}
  </BaseCarousel>
);

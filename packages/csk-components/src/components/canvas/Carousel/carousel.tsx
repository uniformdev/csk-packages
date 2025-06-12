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
  arrowColor,
  arrowBackgroundColor,
}) => (
  <BaseCarousel
    {...{
      backgroundColor,
      spacing,
      border,
      fluidContent,
      fullHeight,
      itemsPerPage,
      gapX,
      arrowColor,
      arrowBackgroundColor,
    }}
    variant={component.variant}
    countOfItems={slots.carouselItems?.items.length ?? 0}
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

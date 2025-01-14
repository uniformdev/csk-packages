'use client';

import { FC } from 'react';
import { UniformSlot, CustomSlotChildRenderFunc } from '@uniformdev/canvas-next-rsc/component';
import { Carousel as BaseCarousel } from '@uniformdev/theme-pack/components/ui';
import { CarouselProps } from '.';

const itemRenderFunc: CustomSlotChildRenderFunc = ({ child, key }) => (
  <div key={key} className="flex size-full min-w-full items-center justify-center">
    {child}
  </div>
);

export const Carousel: FC<CarouselProps> = ({
  slots,
  component,
  context,
  backgroundColor,
  spacing,
  border,
  fluidContent,
  fullHeight,
}) => (
  <BaseCarousel
    {...{ backgroundColor, spacing, border, fluidContent, fullHeight }}
    countOfItems={slots.carouselItems?.items.length ?? 0}
  >
    <UniformSlot context={context} slot={slots.carouselItems} data={component}>
      {itemRenderFunc}
    </UniformSlot>
  </BaseCarousel>
);

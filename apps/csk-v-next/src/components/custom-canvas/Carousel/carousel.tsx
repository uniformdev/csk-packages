'use client';

import { FC } from 'react';
import { UniformSlot, CustomSlotChildRenderFunc } from '@uniformdev/canvas-next-rsc/component';
import BaseCarousel from '@/components/custom-ui/Carousel';
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
  iconColor,
  autoPlay,
}) => (
  <BaseCarousel
    {...{ backgroundColor, spacing, border, fluidContent, fullHeight, iconColor, autoPlay }}
    variant={component.variant}
    countOfItems={slots.carouselItems?.items.length ?? 0}
  >
    <UniformSlot context={context} slot={slots.carouselItems} data={component}>
      {itemRenderFunc}
    </UniformSlot>
  </BaseCarousel>
);

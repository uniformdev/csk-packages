'use client';
import { FC } from 'react';
import { ComponentProps, UniformSlot, CustomSlotChildRenderFunc } from '@uniformdev/canvas-next-rsc/component';
import { ContainerParameters } from '@/components/canvas/Container';
import BaseCarousel from '@/components/ui/Carousel';

export type CarouselParameters = ContainerParameters;
enum CarouselSlots {
  Items = 'carouselItems',
}

type CarouselProps = ComponentProps<CarouselParameters, CarouselSlots>;

const itemRenderFunc: CustomSlotChildRenderFunc = ({ child, key }) => (
  <div key={key} className="flex size-full min-w-full items-center justify-center">
    {child}
  </div>
);

const Carousel: FC<CarouselProps> = ({
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
    countOfItems={slots.carouselItems.items.length}
  >
    <UniformSlot context={context} slot={slots.carouselItems} data={component}>
      {itemRenderFunc}
    </UniformSlot>
  </BaseCarousel>
);

export default Carousel;

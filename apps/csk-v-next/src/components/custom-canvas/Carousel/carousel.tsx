'use client';

import { FC, useMemo } from 'react';
import { UniformSlot, CustomSlotChildRenderFunc } from '@uniformdev/canvas-next-rsc/component';
import { cn } from '@uniformdev/csk-components/utils/styling';
import BaseCarousel from '@/components/custom-ui/Carousel';
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
  iconColor,
  autoPlay,
  countOfItems = 4,
}) => {
  const itemRenderFunc: CustomSlotChildRenderFunc = ({ child, key }) => (
    <div
      key={key}
      style={{
        minWidth: component?.variant !== 'infinite' ? '100%' : `${100 / countOfItems}%`,
      }}
      className={cn('flex size-full  items-center justify-center', {
        'min-w-full': component?.variant !== 'infinite',
      })}
    >
      {child}
    </div>
  );

  const totalCountOfItems = useMemo(() => {
    if (component?.variant === 'infinite') {
      const totalCount = slots.carouselItems?.items.length;

      const itemsInChunk = Math.ceil(totalCount / countOfItems);

      return itemsInChunk ?? 0;
    }
    return slots.carouselItems?.items.length ?? 0;
  }, [component?.variant, slots.carouselItems?.items.length, countOfItems]);

  return (
    <BaseCarousel
      {...{ backgroundColor, spacing, border, fluidContent, fullHeight, iconColor, autoPlay }}
      variant={component.variant}
      countOfItems={totalCountOfItems}
    >
      <UniformSlot context={context} slot={slots.carouselItems} data={component}>
        {itemRenderFunc}
      </UniformSlot>
    </BaseCarousel>
  );
};

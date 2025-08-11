import { FC } from 'react';
import { UniformSlot } from '@uniformdev/canvas-react';
import { CarouselSlots } from '@/new-components/canvas/Carousel';
import { CarouselEmptyPlaceholder } from '@/new-components/canvas/Carousel/empty-placeholder';
import BaseCarousel from '@/new-components/ui/Carousel';
import { CarouselProps } from '.';

export const Carousel: FC<CarouselProps> = ({
  backgroundColor,
  spacing,
  border,
  fluidContent,
  height,
  itemsPerPage,
  gapX,
  component,
}) => (
  <BaseCarousel
    {...{ backgroundColor, spacing, border, fluidContent, height, itemsPerPage, gapX }}
    countOfItems={component?.slots?.[CarouselSlots.Items]?.length ?? 0}
    variant={component.variant}
  >
    {({ className, style }) => (
      <UniformSlot
        name={CarouselSlots.Items}
        wrapperComponent={({ items }) => {
          return items.map((item, index) => (
            <div key={index} className={className} style={style}>
              {item}
            </div>
          ));
        }}
        emptyPlaceholder={<CarouselEmptyPlaceholder slotName={CarouselSlots.Items} />}
      />
    )}
  </BaseCarousel>
);

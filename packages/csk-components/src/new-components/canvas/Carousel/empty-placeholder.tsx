import { FC } from 'react';
import { EmptyComponentPlaceholder } from '@/new-components/ui/EmptyComponentPlaceholder';
import { CarouselSlots } from '.';

export const CarouselEmptyPlaceholder: FC<{ slotName: CarouselSlots }> = ({ slotName }) => {
  switch (slotName) {
    case CarouselSlots.Items:
      return <div className="mx-20 h-20 w-full" />;
    default:
      return <EmptyComponentPlaceholder />;
  }
};

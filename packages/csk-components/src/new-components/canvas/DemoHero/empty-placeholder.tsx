import { FC } from 'react';
import { FlexibleHeroSlots } from '@/new-components/canvas/DemoHero';
import { EmptyComponentPlaceholder } from '@/new-components/ui/EmptyComponentPlaceholder';

export const FlexibleHeroEmptyPlaceholder: FC<{ slotName: FlexibleHeroSlots }> = ({ slotName }) => {
  switch (slotName) {
    case FlexibleHeroSlots.FlexibleHeroContent:
      return <div className="h-20" />;
    case FlexibleHeroSlots.FlexibleHeroCta:
      return <div className="mx-40 h-20 w-full" />;
    default:
      return <EmptyComponentPlaceholder />;
  }
};

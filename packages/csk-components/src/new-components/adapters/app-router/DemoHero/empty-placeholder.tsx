import { FlexibleHeroEmptyPlaceholder, FlexibleHeroSlots } from '@/new-components/canvas/DemoHero';
import { ResolveEmptyPlaceholderOptions } from '@/types/cskTypes';

export const flexibleHeroEmptyPlaceholderWrapper = (props: ResolveEmptyPlaceholderOptions) => {
  return { component: () => <FlexibleHeroEmptyPlaceholder slotName={props.slotName as FlexibleHeroSlots} /> };
};

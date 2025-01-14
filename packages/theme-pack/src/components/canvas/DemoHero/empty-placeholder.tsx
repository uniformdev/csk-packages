import { ResolveEmptyPlaceholderOptions } from '@uniformdev/theme-pack/types';
import { DEFAULT_EMPTY_PLACEHOLDER } from '@uniformdev/theme-pack/utils/createEmptyPlaceholderResolver';
import { FlexibleHeroSlots } from '.';

export const FlexibleHeroEmptyPlaceholder = (props: ResolveEmptyPlaceholderOptions) => {
  switch (props.slotName) {
    case FlexibleHeroSlots.FlexibleHeroContent:
      return { component: () => <div className="h-20" /> };
    case FlexibleHeroSlots.FlexibleHeroCta:
      return { component: () => <div className="mx-40 h-20 w-full" /> };
    default:
      return DEFAULT_EMPTY_PLACEHOLDER;
  }
};

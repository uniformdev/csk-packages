import { ResolveEmptyPlaceholderOptions } from '@uniformdev/theme-pack/types';
import { DEFAULT_EMPTY_PLACEHOLDER } from '@uniformdev/theme-pack/utils/createEmptyPlaceholderResolver';
import { BannerSlots } from '.';

export const BannerEmptyPlaceholder = (props: ResolveEmptyPlaceholderOptions) => {
  switch (props.slotName) {
    case BannerSlots.BannerContent:
      return { component: () => <div className="h-20 w-full" /> };
    default:
      return DEFAULT_EMPTY_PLACEHOLDER;
  }
};

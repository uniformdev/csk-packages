import { ResolveEmptyPlaceholderOptions } from '@uniformdev/csk-components/types/cskTypes';
import { DEFAULT_EMPTY_PLACEHOLDER } from '@uniformdev/csk-components/utils/createEmptyPlaceholderResolver';
import { BannerSlots } from '.';

export const BannerEmptyPlaceholder = (props: ResolveEmptyPlaceholderOptions) => {
  switch (props.slotName) {
    case BannerSlots.BannerContent:
      return { component: () => <div className="h-20 w-full" /> };
    default:
      return DEFAULT_EMPTY_PLACEHOLDER;
  }
};

import { ResolveEmptyPlaceholderOptions } from '@uniformdev/theme-pack/types';
import { DEFAULT_EMPTY_PLACEHOLDER } from '@uniformdev/theme-pack/utils/createEmptyPlaceholderResolver';
import { NavigationFlyoutSlots } from '.';

export const NavigationFlyoutEmptyPlaceholder = (props: ResolveEmptyPlaceholderOptions) => {
  switch (props.slotName) {
    case NavigationFlyoutSlots.NavigationFlyoutLeftContent:
      return { component: () => <div className="h-40 w-48" /> };
    case NavigationFlyoutSlots.NavigationFlyoutRightContent:
      return { component: () => <div className="h-40 w-48" /> };
    default:
      return DEFAULT_EMPTY_PLACEHOLDER;
  }
};

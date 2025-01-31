import { ResolveEmptyPlaceholderOptions } from '@uniformdev/csk-components/types/cskTypes';
import { DEFAULT_EMPTY_PLACEHOLDER } from '@uniformdev/csk-components/utils/createEmptyPlaceholderResolver';
import { NavigationGroupSlots } from '.';

export const NavigationGroupEmptyPlaceholder = (props: ResolveEmptyPlaceholderOptions) => {
  switch (props.slotName) {
    case NavigationGroupSlots.Links:
      return { component: () => <div className="h-40 w-48" /> };
    default:
      return DEFAULT_EMPTY_PLACEHOLDER;
  }
};

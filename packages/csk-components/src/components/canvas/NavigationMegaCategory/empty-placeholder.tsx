import { ResolveEmptyPlaceholderOptions } from '@/types/cskTypes';
import { DEFAULT_EMPTY_PLACEHOLDER } from '@/utils/createEmptyPlaceholderResolver';
import { NavigationMegaCategorySlots } from '.';

export const NavigationMegaCategoryEmptyPlaceholder = (props: ResolveEmptyPlaceholderOptions) => {
  switch (props.slotName) {
    case NavigationMegaCategorySlots.CategoryPanel:
      return { component: () => <div className="h-40 w-48" /> };
    default:
      return DEFAULT_EMPTY_PLACEHOLDER;
  }
};

import { ResolveEmptyPlaceholderOptions } from '@/types/cskTypes';
import { DEFAULT_EMPTY_PLACEHOLDER } from '@/utils/createEmptyPlaceholderResolver';
import { HeaderSlots } from '.';

export const HeaderEmptyPlaceholder = (props: ResolveEmptyPlaceholderOptions) => {
  switch (props.slotName) {
    case HeaderSlots.HeaderLeftContent:
      return { component: () => <div className="h-20 w-48" /> };
    case HeaderSlots.HeaderRightContent:
      return { component: () => <div className="h-20 w-48" /> };
    default:
      return DEFAULT_EMPTY_PLACEHOLDER;
  }
};

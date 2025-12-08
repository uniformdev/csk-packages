import { ResolveEmptyPlaceholderOptions } from '@/types/cskTypes';
import { DEFAULT_EMPTY_PLACEHOLDER } from '@/utils/createEmptyPlaceholderResolver';
import { CookieConsentSlots } from '.';

export const CookieConsentEmptyPlaceholder = (props: ResolveEmptyPlaceholderOptions) => {
  switch (props.slotName) {
    case CookieConsentSlots.CookieConsentContent:
      return { component: () => <div className="h-20 w-full" /> };
    default:
      return DEFAULT_EMPTY_PLACEHOLDER;
  }
};

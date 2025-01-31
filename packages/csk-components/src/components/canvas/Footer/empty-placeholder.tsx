import { ResolveEmptyPlaceholderOptions } from '@uniformdev/csk-components/types/cskTypes';
import { DEFAULT_EMPTY_PLACEHOLDER } from '@uniformdev/csk-components/utils/createEmptyPlaceholderResolver';
import { FooterSlots } from '.';

export const FooterEmptyPlaceholder = (props: ResolveEmptyPlaceholderOptions) => {
  switch (props.slotName) {
    case FooterSlots.FooterLogo:
      return { component: () => <div className="h-20 w-48" /> };
    case FooterSlots.FooterCopyright:
      return { component: () => <div className="h-20 w-48" /> };
    case FooterSlots.FooterContent:
      return { component: () => <div className="h-20 w-48" /> };
    default:
      return DEFAULT_EMPTY_PLACEHOLDER;
  }
};

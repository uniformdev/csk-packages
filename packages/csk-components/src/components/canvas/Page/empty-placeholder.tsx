import { ResolveEmptyPlaceholderOptions } from '@uniformdev/csk-components/types/cskTypes';
import { DEFAULT_EMPTY_PLACEHOLDER } from '@uniformdev/csk-components/utils/createEmptyPlaceholderResolver';
import { CommonPageSlots } from '.';

export const PageEmptyPlaceholder = (props: ResolveEmptyPlaceholderOptions) => {
  switch (props.slotName) {
    case CommonPageSlots.PageHeader:
      return { component: () => <div className="h-40" /> };
    case CommonPageSlots.PageContent:
      return { component: () => <div className="h-[calc(100vh-10rem*2)]" /> };
    case CommonPageSlots.PageFooter:
      return { component: () => <div className="h-40" /> };
    default:
      return DEFAULT_EMPTY_PLACEHOLDER;
  }
};

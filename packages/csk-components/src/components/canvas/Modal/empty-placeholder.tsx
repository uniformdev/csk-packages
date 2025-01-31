import { ResolveEmptyPlaceholderOptions } from '@uniformdev/csk-components/types/cskTypes';
import { DEFAULT_EMPTY_PLACEHOLDER } from '@uniformdev/csk-components/utils/createEmptyPlaceholderResolver';
import { ModalSlots } from '.';

export const ModalEmptyPlaceholder = (props: ResolveEmptyPlaceholderOptions) => {
  switch (props.slotName) {
    case ModalSlots.Trigger:
      return { component: () => <div className="h-20 w-full" /> };
    default:
      return DEFAULT_EMPTY_PLACEHOLDER;
  }
};

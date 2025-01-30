import { ResolveEmptyPlaceholderOptions } from '@uniformdev/csk-components/types/cskTypes';
import { DEFAULT_EMPTY_PLACEHOLDER } from '@uniformdev/csk-components/utils/createEmptyPlaceholderResolver';
import { AccordionSlots } from '.';

export const AccordionEmptyPlaceholder = (props: ResolveEmptyPlaceholderOptions) => {
  switch (props.slotName) {
    case AccordionSlots.AccordionContent:
      return { component: () => <div className="h-20" /> };
    case AccordionSlots.AccordionItems:
      return { component: () => <div className="h-28" /> };
    default:
      return DEFAULT_EMPTY_PLACEHOLDER;
  }
};

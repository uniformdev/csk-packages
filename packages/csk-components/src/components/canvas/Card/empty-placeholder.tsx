import { ResolveEmptyPlaceholderOptions } from '@uniformdev/csk-components/types/cskTypes';
import { DEFAULT_EMPTY_PLACEHOLDER } from '@uniformdev/csk-components/utils/createEmptyPlaceholderResolver';
import { CardSlots } from '.';

export const CardEmptyPlaceholder = (props: ResolveEmptyPlaceholderOptions) => {
  switch (props.slotName) {
    case CardSlots.CardMedia:
      return { component: () => null };
    case CardSlots.CardContent:
      return { component: () => <div className="h-20" /> };
    default:
      return DEFAULT_EMPTY_PLACEHOLDER;
  }
};

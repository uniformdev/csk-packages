import { ResolveEmptyPlaceholderOptions } from '@uniformdev/theme-pack/types/cskTypes';
import { DEFAULT_EMPTY_PLACEHOLDER } from '@uniformdev/theme-pack/utils/createEmptyPlaceholderResolver';
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

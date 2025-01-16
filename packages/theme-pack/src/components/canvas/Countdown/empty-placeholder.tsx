import { ResolveEmptyPlaceholderOptions } from '@uniformdev/theme-pack/types/cskTypes';
import { DEFAULT_EMPTY_PLACEHOLDER } from '@uniformdev/theme-pack/utils/createEmptyPlaceholderResolver';
import { CountdownSlots } from '.';

export const CountdownEmptyPlaceholder = (props: ResolveEmptyPlaceholderOptions) => {
  switch (props.slotName) {
    case CountdownSlots.CountdownComplete:
      return { component: () => null };
    default:
      return DEFAULT_EMPTY_PLACEHOLDER;
  }
};

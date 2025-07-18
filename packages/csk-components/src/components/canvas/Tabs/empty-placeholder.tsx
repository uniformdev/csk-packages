import { ResolveEmptyPlaceholderOptions } from '@/types/cskTypes';
import { DEFAULT_EMPTY_PLACEHOLDER } from '@/utils/createEmptyPlaceholderResolver';
import { TabsSlots } from '.';

export const TabsEmptyPlaceholder = (props: ResolveEmptyPlaceholderOptions) => {
  switch (props.slotName) {
    case TabsSlots.TabItems:
      return {
        component: () => <div className="h-20 w-full" />,
      };
    default:
      return DEFAULT_EMPTY_PLACEHOLDER;
  }
};

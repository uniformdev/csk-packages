import { ResolveEmptyPlaceholderOptions } from '@uniformdev/csk-components/types/cskTypes';
import { DEFAULT_EMPTY_PLACEHOLDER } from '@uniformdev/csk-components/utils/createEmptyPlaceholderResolver';
import { SectionSlots } from '.';

export const SectionEmptyPlaceholder = ({ parentComponent, slotName }: ResolveEmptyPlaceholderOptions) => {
  const isDefault = !parentComponent?.variant;
  switch (slotName) {
    case SectionSlots.SectionMedia:
      return {
        component: () => (isDefault ? null : <div className="size-full" />),
      };
    case SectionSlots.SectionContent:
      return { component: () => <div className="h-20" /> };
    case SectionSlots.SectionCTA:
      return {
        component: () => <div className="mx-40 h-20 w-full" />,
      };
    default:
      return DEFAULT_EMPTY_PLACEHOLDER;
  }
};

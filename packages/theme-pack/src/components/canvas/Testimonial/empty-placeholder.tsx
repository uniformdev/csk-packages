import { ResolveEmptyPlaceholderOptions } from '@uniformdev/theme-pack/types/cskTypes';
import { DEFAULT_EMPTY_PLACEHOLDER } from '@uniformdev/theme-pack/utils/createEmptyPlaceholderResolver';
import { TestimonialSlots } from '.';

export const TestimonialEmptyPlaceholder = ({ slotName }: ResolveEmptyPlaceholderOptions) => {
  switch (slotName) {
    case TestimonialSlots.TestimonialSecondaryImage:
      return { component: () => <div className="h-20 w-64" /> };
    case TestimonialSlots.TestimonialContent:
      return { component: () => <div className="h-20 w-64" /> };
    case TestimonialSlots.TestimonialPrimaryImage:
      return { component: () => <div className="size-full" /> };
    case TestimonialSlots.TestimonialAuthor:
      return { component: () => <div className="h-20 w-64" /> };
    default:
      return DEFAULT_EMPTY_PLACEHOLDER;
  }
};

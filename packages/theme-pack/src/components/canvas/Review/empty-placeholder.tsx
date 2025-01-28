import { ResolveEmptyPlaceholderOptions } from '@uniformdev/theme-pack/types/cskTypes';
import { DEFAULT_EMPTY_PLACEHOLDER } from '@uniformdev/theme-pack/utils/createEmptyPlaceholderResolver';
import { ReviewSlots, ReviewVariants } from '.';

export const ReviewEmptyPlaceholder = ({ parentComponent, slotName }: ResolveEmptyPlaceholderOptions) => {
  const isMultiColumn = parentComponent?.variant === ReviewVariants.MultiColumn;
  switch (slotName) {
    case ReviewSlots.ReviewImage:
      return {
        component: () => (isMultiColumn ? <div className="size-full" /> : null),
      };
    case ReviewSlots.ReviewPersonInfo:
      return { component: () => (isMultiColumn ? <div className="h-20 w-full" /> : <div className="h-20 w-52" />) };
    case ReviewSlots.ReviewContent:
      return { component: () => (isMultiColumn ? <div className="h-20 w-full" /> : <div className="h-20 w-52" />) };
    default:
      return DEFAULT_EMPTY_PLACEHOLDER;
  }
};

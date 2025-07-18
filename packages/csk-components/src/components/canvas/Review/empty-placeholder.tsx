import { ResolveEmptyPlaceholderOptions } from '@/types/cskTypes';
import { DEFAULT_EMPTY_PLACEHOLDER } from '@/utils/createEmptyPlaceholderResolver';
import { ReviewSlots } from '.';

export const ReviewEmptyPlaceholder = ({ slotName }: ResolveEmptyPlaceholderOptions) => {
  // To show correct empty placeholder for current variant
  // const isMultiColumn = parentComponent?.variant === ReviewVariants.MultiColumn;
  const isMultiColumn = true;

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

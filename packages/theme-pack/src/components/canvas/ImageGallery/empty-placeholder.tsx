import { ResolveEmptyPlaceholderOptions } from '@uniformdev/theme-pack/types/cskTypes';
import { DEFAULT_EMPTY_PLACEHOLDER } from '@uniformdev/theme-pack/utils/createEmptyPlaceholderResolver';
import { ImageGallerySlots } from '.';

export const ImageGalleryEmptyPlaceholder = (props: ResolveEmptyPlaceholderOptions) => {
  switch (props.slotName) {
    case ImageGallerySlots.Items:
      return { component: () => <div className=" mx-auto size-48" /> };
    default:
      return DEFAULT_EMPTY_PLACEHOLDER;
  }
};

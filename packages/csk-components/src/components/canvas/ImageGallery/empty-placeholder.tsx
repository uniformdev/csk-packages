import { ResolveEmptyPlaceholderOptions } from '@uniformdev/csk-components/types/cskTypes';
import { DEFAULT_EMPTY_PLACEHOLDER } from '@uniformdev/csk-components/utils/createEmptyPlaceholderResolver';
import { ImageGallerySlots } from '.';

export const ImageGalleryEmptyPlaceholder = (props: ResolveEmptyPlaceholderOptions) => {
  switch (props.slotName) {
    case ImageGallerySlots.Items:
      return { component: () => <div className=" mx-auto size-48" /> };
    default:
      return DEFAULT_EMPTY_PLACEHOLDER;
  }
};

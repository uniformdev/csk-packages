import { ModalEmptyPlaceholder, ModalSlots } from '@/new-components/canvas/Modal';
import { ResolveEmptyPlaceholderOptions } from '@/types/cskTypes';

export const modalEmptyPlaceholderWrapper = (props: ResolveEmptyPlaceholderOptions) => {
  return { component: () => <ModalEmptyPlaceholder slotName={props.slotName as ModalSlots} /> };
};

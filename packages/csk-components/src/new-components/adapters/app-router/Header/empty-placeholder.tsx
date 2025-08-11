import { HeaderEmptyPlaceholder, HeaderSlots } from '@/new-components/canvas/Header';
import { ResolveEmptyPlaceholderOptions } from '@/types/cskTypes';

export const headerEmptyPlaceholderWrapper = (props: ResolveEmptyPlaceholderOptions) => {
  return { component: () => <HeaderEmptyPlaceholder slotName={props.slotName as HeaderSlots} /> };
};

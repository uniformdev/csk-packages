import { CommonPageSlots, PageEmptyPlaceholder } from '@/new-components/canvas/Page';
import { ResolveEmptyPlaceholderOptions } from '@/types/cskTypes';

export const pageEmptyPlaceholderWrapper = (props: ResolveEmptyPlaceholderOptions) => {
  return { component: () => <PageEmptyPlaceholder slotName={props.slotName as CommonPageSlots} /> };
};

import { FooterEmptyPlaceholder } from '@/new-components/canvas/Footer';
import { ResolveEmptyPlaceholderOptions } from '@/types/cskTypes';
import { FooterSlots } from '.';

export const footerEmptyPlaceholderWrapper = (props: ResolveEmptyPlaceholderOptions) => {
  return { component: () => <FooterEmptyPlaceholder slotName={props.slotName as FooterSlots} /> };
};

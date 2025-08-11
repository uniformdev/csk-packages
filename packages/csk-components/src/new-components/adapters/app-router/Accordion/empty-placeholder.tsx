import { AccordionEmptyPlaceholder, AccordionSlots } from '@/new-components/canvas/Accordion';
import { ResolveEmptyPlaceholderOptions } from '@/types/cskTypes';

export const accordionEmptyPlaceholderWrapper = (props: ResolveEmptyPlaceholderOptions) => {
  return { component: () => <AccordionEmptyPlaceholder slotName={props.slotName as AccordionSlots} /> };
};

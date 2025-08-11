import { AccordionItemParameters, AccordionItemSlots } from '@/new-components/canvas/AccordionItem';
import { ComponentProps } from '@/types/canvasTypes';

export type AccordionItemAdditionalProps = {
  className?: string;
};

export type AccordionItemProps = ComponentProps<AccordionItemParameters, AccordionItemSlots> &
  AccordionItemAdditionalProps;

export { default } from './accordion-item';

import { ComponentProps } from '@uniformdev/canvas-react';
import { AccordionItemParameters } from '@/new-components/canvas/AccordionItem';

export type AccordionItemAdditionalProps = {
  className?: string;
};

export type AccordionItemProps = ComponentProps<AccordionItemParameters> & AccordionItemAdditionalProps;

export { default } from './accordion-item';

import { ComponentProps } from '@uniformdev/canvas-next-rsc/component';
import { ContainerParameters } from '@/components/canvas/Container/parameters';

export type AccordionParameters = ContainerParameters;

export enum AccordionSlots {
  AccordionContent = 'accordionContent',
  AccordionItems = 'accordionItems',
}

export type AccordionProps = ComponentProps<AccordionParameters, AccordionSlots>;

export { Accordion as default } from './accordion';
export { AccordionEmptyPlaceholder } from './empty-placeholder';

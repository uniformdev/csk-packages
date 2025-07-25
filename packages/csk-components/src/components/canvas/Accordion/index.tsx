import { ContainerParameters } from '@/components/canvas/Container/parameters';
import { ComponentProps } from '@/types/cskTypes';

export type AccordionParameters = ContainerParameters;

export enum AccordionSlots {
  AccordionContent = 'accordionContent',
  AccordionItems = 'accordionItems',
}

export type AccordionProps = ComponentProps<AccordionParameters, AccordionSlots>;

export { default } from './accordion';
export { AccordionEmptyPlaceholder } from './empty-placeholder';

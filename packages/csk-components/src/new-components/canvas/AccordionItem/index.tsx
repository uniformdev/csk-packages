import { ContainerParameters } from '@/new-components/canvas/Container';
import { TextParameters } from '@/new-components/canvas/Text';

export type AccordionItemParameters = Pick<ContainerParameters, 'backgroundColor' | 'spacing' | 'border'> &
  TextParameters;

export enum AccordionItemSlots {
  AccordionItemContent = 'accordionItemContent',
}

import dynamic from 'next/dynamic';
import { ContainerParameters } from '@/components/canvas/Container/parameters';
import { TextParameters } from '@/components/canvas/Text/parameters';
import { ComponentProps } from '@/types/cskTypes';

export type AccordionItemParameters = Pick<ContainerParameters, 'backgroundColor' | 'spacing' | 'border'> &
  TextParameters;

export type AccordionItemAdditionalProps = {
  className?: string;
};

export enum AccordionItemSlots {
  AccordionItemContent = 'accordionItemContent',
}

export type AccordionItemProps = ComponentProps<AccordionItemParameters, AccordionItemSlots> &
  AccordionItemAdditionalProps;

export default dynamic(() => import('./accordion-item').then(mod => mod.default));

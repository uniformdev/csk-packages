import dynamic from 'next/dynamic';
import { ComponentProps } from '@uniformdev/canvas-next-rsc/component';
import { ContainerParameters, TextParameters } from '@uniformdev/csk-components/components/canvas';

export type AccordionItemParameters = Pick<ContainerParameters, 'backgroundColor' | 'spacing' | 'border'> &
  TextParameters;

export type AccordionItemAdditionalProps = {
  className?: string;
};

export enum AccordionItemSlots {
  AccordionItemContent = 'accordionItemContent',
}

export type AccordionItemProps = ComponentProps<
  AccordionItemParameters & AccordionItemAdditionalProps,
  AccordionItemSlots
>;

export default dynamic(() => import('./accordion-item').then(mod => mod.AccordionItem));

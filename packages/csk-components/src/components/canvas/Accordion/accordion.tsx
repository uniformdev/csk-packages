import { FC } from 'react';
import { UniformSlot } from '@uniformdev/canvas-next-rsc/component';
import BaseAccordion from '@/components/ui/Accordion';
import { AccordionProps } from '.';

export const Accordion: FC<AccordionProps> = ({
  slots,
  component,
  context,
  backgroundColor,
  spacing,
  border,
  fluidContent,
  fullHeight,
  fitHeight,
  height,
}) => (
  <BaseAccordion
    accordionContent={<UniformSlot data={component} context={context} slot={slots.accordionContent} />}
    accordionItems={<UniformSlot data={component} context={context} slot={slots.accordionItems} />}
    {...{ backgroundColor, spacing, border, fluidContent, fullHeight, fitHeight, height }}
  />
);

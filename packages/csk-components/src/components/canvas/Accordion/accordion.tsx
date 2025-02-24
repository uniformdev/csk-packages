import { FC } from 'react';
import { UniformSlot } from '@uniformdev/canvas-next-rsc/component';
import Container from '@/components/ui/Container';
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
}) => (
  <Container className="flex flex-col gap-8" {...{ backgroundColor, spacing, border, fluidContent, fullHeight }}>
    <div className="flex flex-col gap-4 text-start">
      <UniformSlot data={component} context={context} slot={slots.accordionContent} />
    </div>
    <UniformSlot data={component} context={context} slot={slots.accordionItems} />
  </Container>
);

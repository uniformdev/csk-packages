import { FC } from 'react';
import { ComponentProps, UniformSlot } from '@uniformdev/canvas-next-rsc/component';
import { ContainerParameters } from '@/components/canvas/Container';
import Container from '@/components/ui/Container';

export type AccordionParameters = ContainerParameters;
enum AccordionSlots {
  AccordionContent = 'accordionContent',
  AccordionItems = 'accordionItems',
}

type AccordionProps = ComponentProps<AccordionParameters, AccordionSlots>;

const Accordion: FC<AccordionProps> = ({
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

export default Accordion;

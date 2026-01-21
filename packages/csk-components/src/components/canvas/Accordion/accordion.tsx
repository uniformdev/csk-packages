import { FC } from 'react';
import { UniformSlot } from '@uniformdev/next-app-router/component';
import BaseAccordion from '@/components/ui/Accordion';
import { withFlattenParameters } from '@/utils/withFlattenParameters';
import { AccordionParameters, AccordionProps } from '.';

const Accordion: FC<AccordionProps & AccordionParameters> = ({
  slots,
  backgroundColor,
  spacing,
  border,
  fluidContent,
  height,
}) => (
  <BaseAccordion
    accordionContent={<UniformSlot slot={slots.accordionContent} />}
    accordionItems={<UniformSlot slot={slots.accordionItems} />}
    {...{ backgroundColor, spacing, border, fluidContent, height }}
  />
);

export default withFlattenParameters(Accordion);

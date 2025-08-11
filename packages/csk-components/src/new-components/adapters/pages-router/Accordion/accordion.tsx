import { FC } from 'react';
import { UniformSlot } from '@uniformdev/canvas-react';
import { AccordionEmptyPlaceholder, AccordionSlots } from '@/new-components/canvas/Accordion';
import BaseAccordion from '@/new-components/ui/Accordion';
import { AccordionProps } from '.';

const Accordion: FC<AccordionProps> = ({ backgroundColor, spacing, border, fluidContent, height }) => (
  <BaseAccordion
    accordionContent={
      <UniformSlot
        name={AccordionSlots.AccordionContent}
        emptyPlaceholder={<AccordionEmptyPlaceholder slotName={AccordionSlots.AccordionContent} />}
      />
    }
    accordionItems={
      <UniformSlot
        name={AccordionSlots.AccordionItems}
        emptyPlaceholder={<AccordionEmptyPlaceholder slotName={AccordionSlots.AccordionItems} />}
      />
    }
    {...{ backgroundColor, spacing, border, fluidContent, height }}
  />
);

export default Accordion;

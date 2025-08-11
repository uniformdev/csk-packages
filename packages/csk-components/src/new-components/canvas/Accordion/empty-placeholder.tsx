import { FC } from 'react';
import { AccordionSlots } from '@/new-components/canvas/Accordion';
import { EmptyComponentPlaceholder } from '@/new-components/ui/EmptyComponentPlaceholder';

export const AccordionEmptyPlaceholder: FC<{ slotName: AccordionSlots }> = ({ slotName }) => {
  switch (slotName) {
    case AccordionSlots.AccordionContent:
      return <div className="h-20" />;
    case AccordionSlots.AccordionItems:
      return <div className="h-28" />;
    default:
      return <EmptyComponentPlaceholder />;
  }
};

import { FC } from 'react';
import { UniformSlot, UniformText } from '@uniformdev/canvas-react';
import { AccordionItemSlots } from '@/new-components/canvas/AccordionItem';
import BaseAccordionItem from '@/new-components/ui/AccordionItem';
import BaseText from '@/new-components/ui/Text';
import { AccordionItemProps } from '.';

const AccordionItem: FC<AccordionItemProps> = ({
  tag,
  alignment,
  color,
  size,
  font,
  weight,
  transform,
  decoration,
  letterSpacing,
  backgroundColor,
  spacing,
  className,
}) => (
  <BaseAccordionItem
    {...{
      backgroundColor,
      spacing,
      className,
    }}
    text={
      <BaseText {...{ alignment, color, size, font, weight, transform, decoration, letterSpacing }}>
        <UniformText placeholder="Text goes here" parameterId="text" as={tag || undefined} />
      </BaseText>
    }
    accordionItemContent={<UniformSlot name={AccordionItemSlots.AccordionItemContent} />}
  />
);

export default AccordionItem;

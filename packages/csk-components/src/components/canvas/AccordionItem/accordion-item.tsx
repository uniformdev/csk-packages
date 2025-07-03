'use client';

import { FC } from 'react';
import { UniformSlot, UniformText } from '@uniformdev/canvas-next-rsc/component';
import BaseAccordionItem from '@/components/ui/AccordionItem';
import BaseText from '@/components/ui/Text';
import { AccordionItemProps } from '.';

export const AccordionItem: FC<AccordionItemProps> = ({
  tag,
  alignment,
  color,
  size,
  font,
  weight,
  transform,
  decoration,
  letterSpacing,
  slots,
  component,
  context,
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
        <UniformText
          placeholder="Text goes here"
          parameterId="text"
          as={tag || undefined}
          component={component}
          context={context}
        />
      </BaseText>
    }
    accordionItemContent={<UniformSlot data={component} context={context} slot={slots.accordionItemContent} />}
  />
);

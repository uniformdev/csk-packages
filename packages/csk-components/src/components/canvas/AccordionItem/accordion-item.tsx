'use client';

import { FC } from 'react';
import { UniformSlot, UniformText } from '@uniformdev/canvas-next-rsc-v2/component';
import BaseAccordionItem from '@/components/ui/AccordionItem';
import BaseText from '@/components/ui/Text';
import { withFlattenParameters } from '@/utils/withFlattenParameters';
import { AccordionItemParameters, AccordionItemProps } from '.';

const AccordionItem: FC<AccordionItemProps & AccordionItemParameters> = ({
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
  backgroundColor,
  spacing,
  className,
  parameters,
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
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          parameter={parameters.text as any}
          as={tag || undefined}
          component={component}
        />
      </BaseText>
    }
    accordionItemContent={<UniformSlot slot={slots.accordionItemContent} />}
  />
);

export default withFlattenParameters(AccordionItem);

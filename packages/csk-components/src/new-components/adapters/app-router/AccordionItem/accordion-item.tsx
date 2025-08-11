import { FC } from 'react';
import { ComponentParameter, UniformSlot, UniformText } from '@uniformdev/canvas-next-rsc-v2/component';
import { AccordionItemParameters } from '@/new-components/canvas/AccordionItem';
import BaseAccordionItem from '@/new-components/ui/AccordionItem';
import BaseText from '@/new-components/ui/Text';
import { withFlattenParameters } from '@/utils/withFlattenParameters';
import { AccordionItemProps } from '.';

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
          parameter={parameters.text as ComponentParameter<string>}
          as={tag || undefined}
          component={component}
        />
      </BaseText>
    }
    accordionItemContent={<UniformSlot slot={slots.accordionItemContent} />}
  />
);

export default withFlattenParameters(AccordionItem);

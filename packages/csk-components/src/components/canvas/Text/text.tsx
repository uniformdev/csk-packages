import { FC } from 'react';
import { UniformText } from '@uniformdev/canvas-next-rsc/component';
import BaseText from '@/components/ui/Text';
import { TextProps } from '.';

export const Text: FC<TextProps> = ({
  tag,
  size,
  color,
  weight,
  font,
  transform,
  decoration,
  letterSpacing,
  lineCountRestrictions,
  alignment,
  component,
  context,
}) => (
  <BaseText {...{ color, size, font, weight, transform, decoration, letterSpacing, alignment, lineCountRestrictions }}>
    <UniformText
      placeholder="Text goes here"
      parameterId="text"
      as={tag || undefined}
      component={component}
      context={context}
    />
  </BaseText>
);

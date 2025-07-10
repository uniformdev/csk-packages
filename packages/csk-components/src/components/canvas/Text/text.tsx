import { FC } from 'react';
import { UniformText, ComponentParameter } from '@uniformdev/canvas-next-rsc-v2/component';
import BaseText from '@/components/ui/Text';
import { withFlattenParameters } from '@/utils/withFlattenParameters';
import { TextParameters, TextProps } from '.';

const Text: FC<TextProps & TextParameters> = ({
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
  parameters,
}) => (
  <BaseText {...{ color, size, font, weight, transform, decoration, letterSpacing, alignment, lineCountRestrictions }}>
    <UniformText
      placeholder="Text goes here"
      parameter={parameters.text as ComponentParameter<string>}
      as={tag || undefined}
      component={component}
    />
  </BaseText>
);

export default withFlattenParameters(Text);

import { FC } from 'react';
import { ComponentProps, UniformText } from '@uniformdev/canvas-next-rsc/component';
import BaseText, { TextProps as BaseTextProps } from '@/components/ui/Text';
import { withPlaygroundWrapper } from '@/hocs';

export type TextParameters = {
  text?: string;
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span';
  size?: BaseTextProps['size'];
  color?: string;
  weight?: BaseTextProps['weight'];
  font?: string;
  alignment?: BaseTextProps['alignment'];
  transform?: BaseTextProps['transform'];
  decoration?: BaseTextProps['decoration'];
  letterSpacing?: BaseTextProps['letterSpacing'];
  lineCountRestrictions?: string;
};

type TextProps = ComponentProps<TextParameters>;

const Text: FC<TextProps> = ({
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

export default withPlaygroundWrapper(Text);

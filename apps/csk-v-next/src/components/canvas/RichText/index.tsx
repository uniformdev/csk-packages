import { FC } from 'react';
import { ComponentProps, UniformRichText } from '@uniformdev/canvas-next-rsc/component';
import { RichTextNode } from '@uniformdev/richtext';
import BaseText from '@/components/ui/Text';
import { withPlaygroundWrapper } from '@/hocs';

export type RichTextParameters = {
  text?: RichTextNode;
  color?: string;
  font?: string;
  lineCountRestrictions: string;
};

type RichTextProps = ComponentProps<RichTextParameters>;

const RichText: FC<RichTextProps> = ({ color, lineCountRestrictions, font, component }) => (
  <BaseText lineCountRestrictions={lineCountRestrictions} color={color} font={font}>
    <UniformRichText
      className="prose max-w-full marker:text-current [&_*:not(pre)]:text-current"
      parameterId="text"
      component={component}
      placeholder="Rich text content goes here..."
    />
  </BaseText>
);

export default withPlaygroundWrapper(RichText);

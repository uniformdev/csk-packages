import { FC } from 'react';
import { ComponentProps, UniformRichText } from '@uniformdev/canvas-next-rsc/component';
import { RichTextNode } from '@uniformdev/richtext';
import BaseText from '@/components/ui/Text';
import { withPlaygroundWrapper } from '@/hocs';
import { cn } from '@/utils';

export type RichTextAdditionalProps = {
  className?: string;
};

export type RichTextParameters = {
  text?: RichTextNode;
  color?: string;
  font?: string;
  lineCountRestrictions: string;
};

export type RichTextProps = ComponentProps<RichTextParameters & RichTextAdditionalProps>;

const RichText: FC<RichTextProps> = ({ color, lineCountRestrictions, font, component, className }) => (
  <BaseText lineCountRestrictions={lineCountRestrictions} color={color} font={font}>
    <UniformRichText
      className={cn('prose max-w-full marker:text-current [&_*:not(pre)]:text-current', className)}
      parameterId="text"
      component={component}
      placeholder="Rich text content goes here..."
    />
  </BaseText>
);

export default withPlaygroundWrapper(RichText);

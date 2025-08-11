import { FC } from 'react';
import { UniformRichText } from '@uniformdev/canvas-react';
import BaseText from '@/new-components/ui/Text';
import { cn } from '@/utils/styling';
import { RichTextProps } from '.';

const RichText: FC<RichTextProps> = ({ color, lineCountRestrictions, font, className }) => (
  <BaseText lineCountRestrictions={lineCountRestrictions} color={color} font={font}>
    <UniformRichText
      className={cn('prose max-w-full marker:text-current [&_*:not(pre)]:text-current', className)}
      parameterId="text"
      placeholder="Rich text content goes here..."
    />
  </BaseText>
);

export default RichText;

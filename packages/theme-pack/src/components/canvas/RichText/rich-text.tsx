import { FC } from 'react';
import { UniformRichText } from '@uniformdev/canvas-next-rsc/component';
import { Text as BaseText } from '@uniformdev/theme-pack/components/ui';
import { cn } from '@uniformdev/theme-pack/utils/styling';
import { RichTextProps } from '.';

export const RichText: FC<RichTextProps> = ({ color, lineCountRestrictions, font, component, className }) => (
  <BaseText lineCountRestrictions={lineCountRestrictions} color={color} font={font}>
    <UniformRichText
      className={cn('prose max-w-full marker:text-current [&_*:not(pre)]:text-current', className)}
      parameterId="text"
      component={component}
      placeholder="Rich text content goes here..."
    />
  </BaseText>
);

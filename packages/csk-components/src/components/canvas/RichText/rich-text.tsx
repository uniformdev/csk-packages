import { FC } from 'react';
import { UniformRichText } from '@uniformdev/canvas-next-rsc-v2/component';
import BaseText from '@/components/ui/Text';
import { cn } from '@/utils/styling';
import { withFlattenParameters } from '@/utils/withFlattenParameters';
import { RichTextProps, RichTextParameters, RichTextAdditionalProps } from '.';

const RichText: FC<RichTextProps & RichTextParameters & RichTextAdditionalProps> = ({
  color,
  lineCountRestrictions,
  font,
  component,
  className,
  parameters,
}) => (
  <BaseText lineCountRestrictions={lineCountRestrictions} color={color} font={font}>
    <UniformRichText
      className={cn('prose max-w-full marker:text-current [&_*:not(pre)]:text-current', className)}
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      parameter={parameters.text as any}
      component={component}
      placeholder="Rich text content goes here..."
    />
  </BaseText>
);

export default withFlattenParameters(RichText);

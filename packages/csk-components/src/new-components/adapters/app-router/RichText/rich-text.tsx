import { FC } from 'react';
import { ComponentParameter, UniformRichText } from '@uniformdev/canvas-next-rsc-v2/component';
import { RichTextParameters } from '@/new-components/canvas/RichText';
import BaseText from '@/new-components/ui/Text';
import { cn } from '@/utils/styling';
import { withFlattenParameters } from '@/utils/withFlattenParameters';
import { RichTextProps, RichTextAdditionalProps } from '.';

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
      parameter={parameters.text as ComponentParameter<string>}
      component={component}
      placeholder="Rich text content goes here..."
    />
  </BaseText>
);

export default withFlattenParameters(RichText);

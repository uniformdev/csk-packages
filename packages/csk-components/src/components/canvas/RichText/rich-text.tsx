import { FC } from 'react';
import { ComponentParameter, UniformRichText } from '@uniformdev/next-app-router/component';
import BaseText from '@/components/ui/Text';
import { cn, resolveViewPort } from '@/utils/styling';
import { withFlattenParameters } from '@/utils/withFlattenParameters';
import { RichTextProps, RichTextParameters, RichTextAdditionalProps } from '.';

const RichText: FC<RichTextProps & RichTextParameters & RichTextAdditionalProps> = ({
  color,
  lineCountRestrictions,
  font,
  size,
  component,
  className,
  parameters,
}) => (
  <BaseText lineCountRestrictions={lineCountRestrictions} color={color} font={font}>
    <UniformRichText
      className={cn(
        'prose max-w-full marker:text-current [&_*:not(pre)]:text-current',
        {
          [resolveViewPort(size, 'prose-{value}')]: size,
        },
        className
      )}
      parameter={parameters.text as ComponentParameter<string>}
      component={component}
      placeholder="Rich text content goes here..."
    />
  </BaseText>
);

export default withFlattenParameters(RichText);

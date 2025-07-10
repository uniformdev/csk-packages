import { FC } from 'react';
import { UniformText } from '@uniformdev/canvas-next-rsc-v2/component';
import BaseIconLabel from '@/components/ui/IconLabel';
import BaseImage from '@/components/ui/Image';
import { ReplaceFieldsWithAssets } from '@/types/cskTypes';
import { withFlattenParameters } from '@/utils/withFlattenParameters';
import { IconLabelParameters, IconLabelProps } from '.';

const IconLabel: FC<IconLabelProps & ReplaceFieldsWithAssets<IconLabelParameters, 'icon'>> = ({
  icon,
  size,
  tag,
  color,
  weight,
  font,
  transform,
  decoration,
  letterSpacing,
  alignment,
  parameters,
  component,
}) => {
  const [resolvedImage] = icon || [];
  const { url, title = '' } = resolvedImage || {};

  return (
    <BaseIconLabel
      icon={url ? <BaseImage src={url} alt={title} fill /> : undefined}
      {...{ size, tag, color, weight, font, transform, decoration, letterSpacing, alignment }}
    >
      <UniformText
        placeholder="Text goes here"
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        parameter={parameters.text as any}
        component={component}
      />
    </BaseIconLabel>
  );
};

export default withFlattenParameters(IconLabel);

import { FC } from 'react';
import { UniformText } from '@uniformdev/canvas-next-rsc/component';
import { IconLabel as BaseIconLabel, Image as BaseImage } from '@uniformdev/csk-components/components/ui';
import { resolveAsset } from '@uniformdev/csk-components/utils/assets';
import { IconLabelProps } from '.';

export const IconLabel: FC<IconLabelProps> = ({
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
  component,
  context,
}) => {
  const [resolvedImage] = resolveAsset(icon);
  const { url, title = '' } = resolvedImage || {};

  return (
    <BaseIconLabel
      icon={url ? <BaseImage src={url} alt={title} fill /> : undefined}
      {...{ size, tag, color, weight, font, transform, decoration, letterSpacing, alignment }}
    >
      <UniformText placeholder="Text goes here" parameterId="text" component={component} context={context} />
    </BaseIconLabel>
  );
};

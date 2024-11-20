import { FC } from 'react';
import { Asset } from '@uniformdev/assets';
import { ComponentProps, UniformText } from '@uniformdev/canvas-next-rsc/component';
import { TextParameters as BaseTextParameters } from '@/components/canvas/Text';
import BaseIconLabel from '@/components/ui/IconLabel';
import BaseImage from '@/components/ui/Image';
import { withPlaygroundWrapper } from '@/hocs';
import { resolveAsset } from '@/utils';

export type IconLabelParameters = BaseTextParameters & {
  icon?: Asset[];
};

type IconLabelProps = ComponentProps<IconLabelParameters>;

const IconLabel: FC<IconLabelProps> = ({
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
      icon={<BaseImage src={url} alt={title} fill />}
      {...{ size, tag, color, weight, font, transform, decoration, letterSpacing, alignment }}
    >
      <UniformText placeholder="Text goes here" parameterId="text" component={component} context={context} />
    </BaseIconLabel>
  );
};

export default withPlaygroundWrapper(IconLabel);

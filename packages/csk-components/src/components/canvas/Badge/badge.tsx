import { FC } from 'react';
import { ComponentParameter, UniformText } from '@uniformdev/next-app-router/component';
import BaseText from '@/components/ui/Text';
import { resolveColor } from '@/utils/colorPalette';
import { withFlattenParameters } from '@/utils/withFlattenParameters';
import { BadgeParameters, BadgeProps } from '.';
import { Dot } from './dot';
import { getBadgeClass } from './style-utils';

const Badge: FC<BadgeProps & BadgeParameters> = ({
  component,
  textColor,
  backgroundColor,
  borderColor,
  dotColor,
  pill = false,
  size,
  parameters,
}) => {
  const badge = getBadgeClass({ pill, size, dotColor, borderColor, backgroundColor });

  const dot = resolveColor(dotColor, 'fill');
  return (
    <div className={badge.className} style={badge.style}>
      {dotColor && <Dot className={dot.className} style={dot.style} />}
      <BaseText color={textColor} size="xs">
        <UniformText
          placeholder="Badge text goes here"
          parameter={parameters.text as ComponentParameter<string>}
          component={component}
        />
      </BaseText>
    </div>
  );
};

export default withFlattenParameters(Badge);

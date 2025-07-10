import { FC } from 'react';
import { UniformText } from '@uniformdev/canvas-next-rsc-v2/component';
import BaseText from '@/components/ui/Text';
import { cn } from '@/utils/styling';
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
}) => (
  <div className={getBadgeClass({ pill, size, dotColor, borderColor, backgroundColor })}>
    {dotColor && (
      <Dot
        className={cn({
          [`fill-${dotColor}`]: dotColor,
        })}
      />
    )}
    <BaseText color={textColor} size="xs">
      <UniformText
        placeholder="Badge text goes here"
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        parameter={parameters.text as any}
        component={component}
      />
    </BaseText>
  </div>
);

export default withFlattenParameters(Badge);

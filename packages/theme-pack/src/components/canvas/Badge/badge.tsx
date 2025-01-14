import { FC } from 'react';
import { UniformText } from '@uniformdev/canvas-next-rsc/component';
import { Text as BaseText } from '@uniformdev/theme-pack/components/ui';
import { cn } from '@uniformdev/theme-pack/utils/styling';
import { BadgeProps } from '.';
import { Dot } from './dot';
import { getBadgeClass } from './style-utils';

export const Badge: FC<BadgeProps> = ({
  component,
  context,
  textColor,
  backgroundColor,
  borderColor,
  dotColor,
  pill = false,
  size,
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
      <UniformText placeholder="Badge text goes here" parameterId="text" component={component} context={context} />
    </BaseText>
  </div>
);

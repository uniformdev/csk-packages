import { FC } from 'react';
import { cn } from '@uniformdev/theme-pack/utils/styling';
import { IconLabelProps } from '.';
import BaseText from '../Text';

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
  children,
  textClassName,
}) => (
  <div
    className={cn('flex w-fit items-center gap-x-3', {
      [`text-${size}`]: !!size,
    })}
  >
    {icon && <div className="relative size-[1em]">{icon}</div>}
    <BaseText
      {...{
        alignment,
        tag,
        color,
        size,
        font,
        weight,
        transform,
        decoration,
        letterSpacing,
        className: textClassName,
      }}
    >
      {children}
    </BaseText>
  </div>
);

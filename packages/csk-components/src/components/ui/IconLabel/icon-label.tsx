import { FC } from 'react';
import BaseText from '@/components/ui/Text';
import { resolveColor } from '@/utils/colorPalette';
import { cn } from '@/utils/styling';
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
  children,
  textClassName,
  iconClassName,
  className,
  iconPosition,
}) => {
  const text = resolveColor(color, 'text');
  return (
    <div
      className={cn(
        'flex w-fit items-center gap-x-3',
        text.className,
        {
          [`text-${size}`]: !!size,
          'flex-row-reverse': icon && iconPosition === 'right',
        },
        className
      )}
      style={text.style}
    >
      {icon && <div className={cn('relative size-[1em]', iconClassName)}>{icon}</div>}
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
};

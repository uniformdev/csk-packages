import { CSSProperties } from 'react';
import { isCustomColor, resolveColor } from '@/utils/colorPalette';
import { cn } from '@/utils/styling';
import { BadgeParameters } from '.';

type BadgeClass = {
  pill: BadgeParameters['pill'];
  size: BadgeParameters['size'];
  dotColor: BadgeParameters['dotColor'];
  borderColor: BadgeParameters['borderColor'];
  backgroundColor: BadgeParameters['backgroundColor'];
};

export const getBadgeClass = ({
  pill,
  size,
  dotColor,
  borderColor,
  backgroundColor,
}: BadgeClass): { className: string; style: CSSProperties } => {
  const bg = resolveColor(backgroundColor, 'background');
  const isCustomBorder = isCustomColor(borderColor);
  const customBorderColor = isCustomBorder ? resolveColor(borderColor, 'border').style.borderColor : undefined;
  return {
    className: cn('inline-flex items-center w-fit', bg.className, {
      'rounded-full': pill,
      'rounded-md': !pill,
      'gap-x-1.5': !!dotColor,
      [`ring-1 ring-inset ring-${borderColor}`]: !!borderColor && !isCustomBorder,
      [`p-${size}`]: size,
    }),
    style: {
      ...bg.style,
      ...(customBorderColor ? { boxShadow: `inset 0 0 0 1px ${customBorderColor}` } : {}),
    },
  };
};

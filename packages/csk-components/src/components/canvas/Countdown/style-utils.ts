import { CSSProperties } from 'react';
import { resolveColor } from '@/utils/colorPalette';
import { cn, resolveViewPort } from '@/utils/styling';
import { CountdownParameters, CountdownVariants } from '.';

type UnitClass = {
  variant?: CountdownVariants;
  backgroundColor?: CountdownParameters['backgroundColor'];
  border?: CountdownParameters['border'];
  size?: CountdownParameters['size'];
};
export const getUnitClass = ({
  variant,
  backgroundColor,
  border,
  size,
}: UnitClass): { className: string; style: CSSProperties } => {
  const bg = resolveColor(backgroundColor, 'background');
  return {
    className: cn('flex w-fit p-4 text-center gap-2 items-end leading-none', bg.className, {
      'flex-col': variant === CountdownVariants.LabelsUnder,
      [resolveViewPort(border, '{value}')]: border,
      ['items-center']: border,
      [resolveViewPort(size, 'text-{value}')]: !!size,
      [resolveViewPort(border, '{value}')]: !!border,
    }),
    style: bg.style,
  };
};

type TextClass = {
  textColor?: CountdownParameters['textColor'];
};
export const getTextClass = ({ textColor }: TextClass): { className: string; style: CSSProperties } => {
  const text = resolveColor(textColor, 'text');
  return {
    className: cn('flex gap-5 flex-wrap flex-col sm:flex-row', text.className),
    style: text.style,
  };
};

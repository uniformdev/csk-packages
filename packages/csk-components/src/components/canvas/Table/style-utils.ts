import { CSSProperties } from 'react';
import { resolveColor } from '@/utils/colorPalette';
import { cn } from '@/utils/styling';
import { TableParameters } from '.';

type TableClassesProps = {
  size?: TableParameters['size'];
  textColor?: TableParameters['textColor'];
};
export const getTableClasses = ({
  size,
  textColor,
}: TableClassesProps): { className: string; style: CSSProperties } => {
  const text = resolveColor(textColor, 'text');
  return {
    className: cn('text-left w-full [&_tr:not(:last-child)_td]:border-b [&_th]:border-b', text.className, {
      [`[&_td]:p-${size} [&_th]:p-${size}`]: size,
    }),
    style: text.style,
  };
};

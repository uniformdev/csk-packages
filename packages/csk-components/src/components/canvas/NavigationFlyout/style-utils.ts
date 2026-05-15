import { CSSProperties } from 'react';
import { resolveColor } from '@/utils/colorPalette';
import { cn } from '@/utils/styling';
import type { NavigationFlyoutParameters } from './types';

type CaretClassesProps = {
  isOpen?: boolean;
};
export const getCaretClasses = ({ isOpen }: CaretClassesProps) =>
  cn('transition transform hidden md:block', {
    'rotate-180': isOpen,
    'rotate-0': !isOpen,
  });

type ButtonClassesProps = {
  color?: NavigationFlyoutParameters['color'];
};
export const getButtonClasses = ({ color }: ButtonClassesProps): { className: string; style: CSSProperties } => {
  const text = resolveColor(color, 'text');
  return {
    className: cn('flex items-center gap-x-2', text.className),
    style: text.style,
  };
};

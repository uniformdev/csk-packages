import { cn } from '@/utils/styling';
import { NavigationGroupParameters } from '.';

type CaretClassesProps = {
  isOpen?: boolean;
};
export const getCaretClasses = ({ isOpen }: CaretClassesProps) =>
  cn('transition transform hidden md:block', {
    'rotate-180': isOpen,
    'rotate-0': !isOpen,
  });

type ButtonClassesProps = {
  color?: NavigationGroupParameters['color'];
};
export const getButtonClasses = ({ color }: ButtonClassesProps) =>
  cn('flex items-center gap-x-2', {
    [`text-${color}`]: !!color,
  });

type TextClassesProps = {
  hoverEffect: 'none' | 'underline' | 'brightness' | 'scale';
};
export const getBaseTextClasses = ({ hoverEffect }: TextClassesProps) => {
  const effectsMap: Record<string, string> = {
    brightness: 'opacity-75',
    underline: 'underline',
    scale: 'scale-105',
  };

  return hoverEffect && effectsMap[hoverEffect] && `hover:${effectsMap[hoverEffect]}`;
};

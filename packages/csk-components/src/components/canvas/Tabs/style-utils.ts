import { CSSProperties } from 'react';
import { resolveColor } from '@/utils/colorPalette';
import { cn } from '@/utils/styling';
import { TabsParameters } from '.';

export enum TabsVariants {
  Bordered = 'bordered',
}

type ButtonContainerClassesProps = {
  color: TabsParameters['color'];
  variant?: string;
};
export const getButtonContainerClasses = ({
  color,
  variant,
}: ButtonContainerClassesProps): { className: string; style: CSSProperties } => {
  const isBordered = !!color && variant === TabsVariants.Bordered;
  const border = isBordered ? resolveColor(color, 'border') : { className: '', style: {} as CSSProperties };
  return {
    className: cn('flex flex-row overflow-x-auto ', border.className, {
      'border-b': isBordered,
    }),
    style: border.style,
  };
};

type ButtonClassesProps = {
  color: TabsParameters['color'];
  variant?: string;
  isActiveTab?: boolean;
};
export const getButtonClasses = ({
  color,
  variant,
  isActiveTab = false,
}: ButtonClassesProps): { className: string; style: CSSProperties } => {
  const text = resolveColor(color, 'text');
  const isBordered = variant === TabsVariants.Bordered;
  const activeBorder =
    isActiveTab && isBordered ? resolveColor(color, 'border') : { className: '', style: {} as CSSProperties };
  return {
    className: cn('text-lg shrink-0 font-medium px-5 py-3', text.className, activeBorder.className, {
      'border-b-2': isBordered,
      'opacity-60 hover:opacity-100': !isActiveTab,
      'border-transparent': !isActiveTab && isBordered,
    }),
    style: { ...text.style, ...activeBorder.style },
  };
};

'use client';

import { FC, useMemo } from 'react';
import { DefaultTheme } from 'tailwindcss/types/generated/default-theme';
import { useUniformContext } from '@uniformdev/canvas-next-rsc/component';
import { useQuirks } from '@uniformdev/canvas-next-rsc-client';
import { ViewPort } from '@uniformdev/csk-components/types/cskTypes';
import { cn } from '@uniformdev/csk-components/utils/styling';
import { resolveViewPort } from '@uniformdev/csk-components/utils/styling';

type TextSize = keyof DefaultTheme['fontSize'];

type QuirkSelectorProps = {
  quirkId: string;
  variants: string;
  fullWidth?: boolean;
  border?: string | ViewPort<string>;
  size?: string;
  textColor?: string;
  textSize?: TextSize | ViewPort<TextSize>;
  textWeight?: keyof DefaultTheme['fontWeight'];
  textFont?: 'uppercase' | 'lowercase' | 'capitalize' | 'normal-case';
  textTransform?: string;
  backgroundColor?: string;
};

const QuirkSelector: FC<QuirkSelectorProps> = ({
  quirkId,
  fullWidth,
  textColor,
  textSize,
  backgroundColor,
  border = '',
  textTransform = '',
  textWeight,
  textFont,
  size,
  variants,
}) => {
  const quirks = useQuirks();
  const { context } = useUniformContext();

  const baseStyles = cn(
    'block w-max font-medium focus-visible:outline-none focus-visible:ring-1 disabled:pointer-events-none disabled:opacity-50',
    {
      [`text-${textColor}`]: textColor,
      [`font-${textFont}`]: !!textFont,
      [`font-${textWeight}`]: !!textWeight,
      [`p-${size}`]: size,
      [textTransform]: !!textTransform,
      [resolveViewPort(border, '{value}')]: border,
      [resolveViewPort(textSize, 'text-{value}')]: textSize,
      [`bg-${backgroundColor}`]: backgroundColor,
      'w-full': fullWidth,
    }
  );

  const onChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    await context?.update({
      quirks: {
        ...context?.quirks,
        [quirkId]: e.target.value,
      },
    });
  };

  const variantsToRender = useMemo(
    () =>
      variants?.split(',')?.map(variant => ({
        label: String(variant).charAt(0).toUpperCase() + String(variant).slice(1),
        value: variant,
      })) ?? [],
    [variants]
  );

  return (
    <select className={baseStyles} onChange={onChange} value={quirks?.[quirkId]}>
      <option value="">Select your quirk</option>
      {variantsToRender?.map(variant => (
        <option key={variant.value} value={variant.value}>
          {variant.label}
        </option>
      ))}
    </select>
  );
};

export default QuirkSelector;

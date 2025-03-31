'use client';

import { FC, useEffect, useMemo, useState } from 'react';
import { DefaultTheme } from 'tailwindcss/types/generated/default-theme';
import { ComponentProps, UniformSlot, useUniformContext } from '@uniformdev/canvas-next-rsc/component';
import { useQuirks } from '@uniformdev/canvas-next-rsc-client';
import { ViewPort } from '@uniformdev/csk-components/types/cskTypes';
import { cn } from '@uniformdev/csk-components/utils/styling';
import { resolveViewPort } from '@uniformdev/csk-components/utils/styling';

type TextSize = keyof DefaultTheme['fontSize'];

type QuirkSelectorParameters = {
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

enum QuirkSelectorSlots {
  SaveButton = 'saveButton',
  SuccessMessage = 'successMessage',
}

type QuirkSelectorProps = ComponentProps<QuirkSelectorParameters, QuirkSelectorSlots>;

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
  component,
  context,
  slots,
}) => {
  const quirks = useQuirks();
  const [isSuccess, setIsSuccess] = useState(false);
  const [selectedQuirk, setSelectedQuirk] = useState(quirks?.[quirkId]);

  const { context: uniformContext } = useUniformContext();

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
    setSelectedQuirk(e.target.value);
  };

  const onSave = async () => {
    setIsSuccess(true);
    await uniformContext?.update({
      quirks: {
        ...uniformContext?.quirks,
        [quirkId]: selectedQuirk,
      },
    });

    setTimeout(() => {
      setIsSuccess(false);
    }, 3000);
  };

  const variantsToRender = useMemo(
    () =>
      variants?.split(',')?.map(variant => ({
        label: String(variant).charAt(0).toUpperCase() + String(variant).slice(1),
        value: variant,
      })) ?? [],
    [variants]
  );

  useEffect(() => {
    const newQuirk = quirks?.[quirkId];

    setSelectedQuirk(newQuirk);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quirks]);

  return (
    <div className="flex flex-col gap-y-8">
      <select className={baseStyles} onChange={onChange} value={selectedQuirk}>
        <option value="">Select your quirk</option>
        {variantsToRender?.map(variant => (
          <option key={variant.value} value={variant.value}>
            {variant.label}
          </option>
        ))}
      </select>

      <div onClick={onSave}>
        <UniformSlot context={context} data={component} slot={slots.saveButton} />
      </div>

      <div
        className={cn('transition-opacity duration-300', {
          'opacity-0 h-0': !isSuccess,
          'opacity-100 h-auto': isSuccess,
        })}
      >
        <UniformSlot context={context} data={component} slot={slots.successMessage} />
      </div>
    </div>
  );
};

export default QuirkSelector;

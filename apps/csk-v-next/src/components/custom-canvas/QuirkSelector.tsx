'use client';

import { FC, useEffect, useMemo, useState } from 'react';
import { ComponentProps, UniformSlot, useUniformContext } from '@uniformdev/canvas-next-rsc/component';
import { useQuirks } from '@uniformdev/canvas-next-rsc-client';
import { cn } from '@uniformdev/csk-components/utils/styling';
import Select from '@/modules/search/ui/Select';

type QuirkSelectorParameters = {
  quirkId: string;
  variants: string;
};

enum QuirkSelectorSlots {
  SaveButton = 'saveButton',
  SuccessMessage = 'successMessage',
}

type QuirkSelectorProps = ComponentProps<QuirkSelectorParameters, QuirkSelectorSlots>;

const QuirkSelector: FC<QuirkSelectorProps> = ({ quirkId, variants, component, context, slots }) => {
  const quirks = useQuirks();
  const [isSuccess, setIsSuccess] = useState(false);
  const [selectedQuirk, setSelectedQuirk] = useState(quirks?.[quirkId]);

  const { context: uniformContext } = useUniformContext();

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
    <div className="flex flex-col items-start gap-y-8">
      <Select onChange={onChange} value={selectedQuirk} className="min-w-[200px]">
        <option value="">Select your quirk</option>
        {variantsToRender?.map(variant => (
          <option key={variant.value} value={variant.value}>
            {variant.label}
          </option>
        ))}
      </Select>

      <div
        className={cn({
          'pointer-events-none opacity-50': selectedQuirk === quirks?.[quirkId],
        })}
        onClick={onSave}
      >
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

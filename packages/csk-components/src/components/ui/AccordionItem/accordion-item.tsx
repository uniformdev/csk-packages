'use client';

import { FC, useCallback, useState } from 'react';
import Container from '@/components/ui/Container';
import { isCustomColor, resolveColor } from '@/utils/colorPalette';
import { cn } from '@/utils/styling';
import { AccordionItemProps } from '.';
import { IconArrowDown } from './icon-arrow-down';
import { IconArrowUp } from './icon-arrow-up';

export const AccordionItem: FC<AccordionItemProps> = ({
  text,
  backgroundColor,
  spacing,
  className,
  accordionItemContent,
}) => {
  const [isOpened, setOpened] = useState(false);
  const toggleOpenAccordion = useCallback(() => setOpened(isOpened => !isOpened), []);

  const hasCustomBg = isCustomColor(backgroundColor);
  const arrowText = resolveColor(backgroundColor, 'text');

  return (
    <Container {...{ fluidContent: true }}>
      <Container {...{ backgroundColor, spacing, fluidContent: true, className }}>
        <button
          onClick={toggleOpenAccordion}
          className="flex w-full cursor-pointer flex-row items-center justify-between text-start"
        >
          {text}
          <div
            className={cn(arrowText.className, {
              invert: !!backgroundColor && !hasCustomBg,
              'text-black dark:text-white': !backgroundColor,
            })}
            style={arrowText.style}
          >
            {isOpened ? <IconArrowDown /> : <IconArrowUp />}
          </div>
        </button>
      </Container>
      {isOpened && accordionItemContent}
    </Container>
  );
};

'use client';

import { FC, useCallback, useState } from 'react';
import { UniformSlot, UniformText } from '@uniformdev/canvas-next-rsc/component';
import Container from '@/components/ui/Container';
import BaseText from '@/components/ui/Text';
import { cn } from '@/utils/styling';
import { AccordionItemProps } from '.';
import { IconArrowDown } from './icon-arrow-down';
import { IconArrowUp } from './icon-arrow-up';

export const AccordionItem: FC<AccordionItemProps> = ({
  tag,
  alignment,
  color,
  size,
  font,
  weight,
  transform,
  decoration,
  letterSpacing,
  slots,
  component,
  context,
  backgroundColor,
  spacing,
  className,
}) => {
  const [isOpened, setOpened] = useState(false);
  const toggleOpenAccordion = useCallback(() => setOpened(isOpened => !isOpened), []);

  return (
    <Container {...{ fluidContent: true, fullHeight: false }}>
      <Container {...{ backgroundColor, spacing, fluidContent: true, className }}>
        <button onClick={toggleOpenAccordion} className="flex w-full flex-row items-center justify-between text-start">
          <BaseText {...{ alignment, color, size, font, weight, transform, decoration, letterSpacing }}>
            <UniformText
              placeholder="Text goes here"
              parameterId="text"
              as={tag || undefined}
              component={component}
              context={context}
            />
          </BaseText>
          <div
            className={cn({
              [`text-${backgroundColor} invert`]: !!backgroundColor,
              'text-black dark:text-white': !backgroundColor,
            })}
          >
            {isOpened ? <IconArrowDown /> : <IconArrowUp />}
          </div>
        </button>
      </Container>
      {isOpened && <UniformSlot data={component} context={context} slot={slots.accordionItemContent} />}
    </Container>
  );
};

'use client';
import { FC, SVGProps, useCallback, useState } from 'react';
import { ComponentProps, UniformSlot, UniformText } from '@uniformdev/canvas-next-rsc/component';
import { ContainerParameters } from '@/components/canvas/Container';
import { TextParameters } from '@/components/canvas/Text';
import Container from '@/components/ui/Container';
import BaseText from '@/components/ui/Text';
import { cn } from '@/utils';

export type AccordionItemParameters = Pick<ContainerParameters, 'backgroundColor' | 'spacing'> & TextParameters;
enum AccordionItemSlots {
  AccordionItemContent = 'accordionItemContent',
}

type AccordionItemProps = ComponentProps<AccordionItemParameters, AccordionItemSlots>;

const IconArrowDown: FC<SVGProps<SVGSVGElement>> = ({ className, ...restProps }) => (
  <svg
    className={className}
    width="15"
    height="9"
    viewBox="0 0 15 9"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    {...restProps}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M7.50013 0L0 7.13651L1.95843 9L7.5 3.7271L13.0416 9L15 7.13651L7.50013 0Z"
      fill="currentColor"
    />
  </svg>
);

const IconArrowUp: FC<SVGProps<SVGSVGElement>> = ({ className, ...restProps }) => (
  <svg
    className={className}
    width="15"
    height="9"
    viewBox="0 0 15 9"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    {...restProps}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M7.49987 9L15 1.86349L13.0416 0L7.5 5.2729L1.95843 0L0 1.86349L7.49987 9Z"
      fill="currentColor"
    />
  </svg>
);

const AccordionItem: FC<AccordionItemProps> = ({
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
}) => {
  const [isOpened, setOpened] = useState(false);
  const toggleOpenAccordion = useCallback(() => setOpened(isOpened => !isOpened), []);

  return (
    <Container {...{ fluidContent: true, fullHeight: false }}>
      <Container {...{ backgroundColor, spacing, fluidContent: true }}>
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

export default AccordionItem;

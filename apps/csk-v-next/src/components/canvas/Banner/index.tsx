'use client';

import { FC, useState } from 'react';
import { ComponentProps, UniformSlot } from '@uniformdev/canvas-next-rsc/component';
import { ContainerParameters } from '@/components/canvas/Container';
import Container from '@/components/ui/Container';
import { cn } from '@/utils';

export enum ContentAlignment {
  Left = 'left',
  Center = 'center',
  Right = 'right',
}

export type BannerParameters = ContainerParameters & {
  iconColor?: string;
  contentAlignment?: ContentAlignment;
  floating?: boolean;
};

enum BannerSlots {
  BannerContent = 'bannerContent',
}

export enum BannerVariants {
  Top = 'top',
  Bottom = 'bottom',
}

type BannerProps = ComponentProps<BannerParameters, BannerSlots>;

const Banner: FC<BannerProps> = ({
  component,
  context,
  backgroundColor,
  spacing,
  border,
  fluidContent,
  slots,
  iconColor,
  contentAlignment = ContentAlignment.Center,
  floating = false,
}) => {
  const variant = component.variant as BannerVariants;

  const isDefaultVariant = !variant;

  const [isOpen, setIsOpen] = useState(true);

  const onClose = () => setIsOpen(false);

  if (!isOpen) return null;

  const positionClasses = cn({
    '!w-11/12 left-1/2 -translate-x-1/2 my-4': floating && !isDefaultVariant,
    'fixed top-0 w-full z-[9999999]': variant === BannerVariants.Top,
    'fixed bottom-0 w-full z-[9999999]': variant === BannerVariants.Bottom,
    'p-4': floating && isDefaultVariant,
  });

  const contentClasses = cn('flex flex-row gap-x-4', {
    'justify-start': contentAlignment === ContentAlignment.Left,
    'justify-center': contentAlignment === ContentAlignment.Center,
    'justify-end': contentAlignment === ContentAlignment.Right,
    'pr-10': contentAlignment === ContentAlignment.Right && iconColor,
    '!mx-0': !fluidContent,
    'rounded-lg': floating,
  });

  return (
    <Container className={positionClasses} {...{ fluidContent, border }}>
      <Container className={cn('relative w-full', contentClasses)} {...{ backgroundColor, spacing, fluidContent }}>
        <UniformSlot data={component} context={context} slot={slots.bannerContent} />

        {iconColor && (
          <button onClick={onClose} className={cn('absolute top-1/2 -translate-y-1/2 right-5')}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
              className="size-5"
            >
              <path
                className={cn({
                  [`fill-${iconColor}`]: iconColor,
                })}
                d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z"
              />
            </svg>
          </button>
        )}
      </Container>
    </Container>
  );
};

export default Banner;

'use client';

import { FC, useCallback, useState } from 'react';
import { ComponentProps, UniformSlot } from '@uniformdev/canvas-next-rsc/component';
import { ContainerParameters } from '@/components/canvas/Container';
import Container from '@/components/ui/Container';
import { cn } from '@/utils';
import CloseButton from './close-button';
import { getContentClasses, getPositionClasses } from './style-utils';
import { BannerVariants } from './types';
import { ContentAlignment } from '../DemoHero';

export type BannerParameters = ContainerParameters & {
  iconColor?: string;
  contentAlignment?: ContentAlignment;
  floating?: boolean;
};
enum BannerSlots {
  BannerContent = 'bannerContent',
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
  const [isOpen, setIsOpen] = useState(true);

  const handleClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  if (!isOpen) return null;

  const positionClasses = getPositionClasses({ variant: component.variant as BannerVariants, floating });
  const contentClasses = getContentClasses({ contentAlignment, iconColor, fluidContent, floating });

  return (
    <Container className={positionClasses} fluidContent={fluidContent} border={border}>
      <Container
        className={cn('relative w-full', contentClasses)}
        backgroundColor={backgroundColor}
        spacing={spacing}
        fluidContent={fluidContent}
      >
        <UniformSlot data={component} context={context} slot={slots.bannerContent} />
        {iconColor && <CloseButton onClose={handleClose} iconColor={iconColor} />}
      </Container>
    </Container>
  );
};

export default Banner;

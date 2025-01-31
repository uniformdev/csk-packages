'use client';

import { FC, useCallback, useState } from 'react';
import { UniformSlot } from '@uniformdev/canvas-next-rsc/component';
import { Container } from '@uniformdev/csk-components/components/ui';
import { cn } from '@uniformdev/csk-components/utils/styling';
import { ContentAlignment, BannerProps } from '.';
import CloseButton from './close-button';
import { getContentClasses, getPositionClasses } from './style-utils';
import { BannerVariants } from './types';

export const Banner: FC<BannerProps> = ({
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

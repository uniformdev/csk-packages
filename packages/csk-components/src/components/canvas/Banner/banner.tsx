'use client';

import { FC, useCallback, useState } from 'react';
import { UniformSlot } from '@uniformdev/canvas-next-rsc-v2/component';
import Container from '@/new-components/ui/Container';
import { cn } from '@/utils/styling';
import { withFlattenParameters } from '@/utils/withFlattenParameters';
import { ContentAlignment, BannerProps, BannerParameters } from '.';
import CloseButton from './close-button';
import { getContentClasses, getPositionClasses } from './style-utils';
import { BannerVariants } from './types';

const Banner: FC<BannerProps & BannerParameters> = ({
  backgroundColor,
  spacing,
  border,
  fluidContent,
  slots,
  iconColor,
  contentAlignment = ContentAlignment.Center,
  floating = false,
  variant,
}) => {
  const [isOpen, setIsOpen] = useState(true);

  const handleClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  if (!isOpen) return null;

  const positionClasses = getPositionClasses({ variant: variant as BannerVariants, floating });
  const contentClasses = getContentClasses({ contentAlignment, iconColor, fluidContent, floating });

  return (
    <Container className={positionClasses} fluidContent={fluidContent} border={border}>
      <Container
        className={cn('relative w-full', contentClasses)}
        backgroundColor={backgroundColor}
        spacing={spacing}
        fluidContent={fluidContent}
      >
        <UniformSlot slot={slots.bannerContent} />
        {iconColor && <CloseButton onClose={handleClose} iconColor={iconColor} />}
      </Container>
    </Container>
  );
};

export default withFlattenParameters(Banner);

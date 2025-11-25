'use client';

import { FC, useCallback, useState } from 'react';
import Container from '@/components/ui/Container';
import { cn } from '@/utils/styling';
import { ContentAlignment, BannerProps, BannerVariants } from '.';
import CloseButton from './close-button';
import { getContentClasses, getPositionClasses } from './style-utils';

const Banner: FC<BannerProps> = ({
  backgroundColor,
  spacing,
  border,
  fluidContent,
  iconColor,
  contentAlignment = ContentAlignment.Center,
  floating = false,
  children,
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
        {children}
        {iconColor && <CloseButton onClose={handleClose} iconColor={iconColor} />}
      </Container>
    </Container>
  );
};

export default Banner;

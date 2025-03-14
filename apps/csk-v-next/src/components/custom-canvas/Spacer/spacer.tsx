import { FC } from 'react';
import { cn } from '@/utils/styling';
import { resolveViewPort } from '@/utils/styling';
import { SpacerProps, SpacerVariants } from '.';

export const Spacer: FC<SpacerProps> = ({ size, component: { variant } }) => {
  const isHorizontal = variant === SpacerVariants.Horizontal;

  return (
    <div
      className={cn({
        [resolveViewPort(size, 'w-{value}')]: isHorizontal,
        [resolveViewPort(size, 'h-{value}')]: !isHorizontal,
      })}
    />
  );
};

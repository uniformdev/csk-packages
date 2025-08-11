import { FC } from 'react';
import { SpacerVariants } from '@/new-components/canvas/Spacer';
import { cn } from '@/utils/styling';
import { SpacerProps } from '.';

const Spacer: FC<SpacerProps> = ({ size, component: { variant } }) => {
  const isHorizontal = variant === SpacerVariants.Horizontal;

  return (
    <div
      className={cn({
        [`w-${size}`]: isHorizontal,
        [`h-${size}`]: !isHorizontal,
      })}
    />
  );
};

export default Spacer;

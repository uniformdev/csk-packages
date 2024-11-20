import { FC } from 'react';
import { ComponentProps } from '@uniformdev/canvas-next-rsc/component';
import { cn } from '@/utils';

export type SpacerParameters = {
  size?: string;
};
export enum SpacerVariants {
  Horizontal = 'horizontal',
}

type SpacerProps = ComponentProps<SpacerParameters>;

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

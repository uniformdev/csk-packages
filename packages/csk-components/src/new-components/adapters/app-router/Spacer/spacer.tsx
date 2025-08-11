import { FC } from 'react';
import { SpacerParameters, SpacerVariants } from '@/new-components/canvas/Spacer';
import { cn } from '@/utils/styling';
import { withFlattenParameters } from '@/utils/withFlattenParameters';
import { SpacerProps } from '.';

export const Spacer: FC<SpacerProps & SpacerParameters> = ({ size, variant }) => {
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

export default withFlattenParameters(Spacer);

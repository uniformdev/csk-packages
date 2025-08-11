import { FC } from 'react';
import { UniformSlot } from '@uniformdev/canvas-next-rsc-v2/component';
import Container from '@/new-components/ui/Container';
import { cn } from '@/utils/styling';
import { withFlattenParameters } from '@/utils/withFlattenParameters';
import { CardParameters, CardProps, CardVariants } from '.';

const Card: FC<CardProps & CardParameters> = ({
  slots,
  backgroundColor,
  spacing,
  border,
  fluidContent,
  height,
  className,
  contentClassName,
  variant,
}) => {
  const isBackgroundImageVariant = variant === CardVariants.BackgroundImage;

  return (
    <Container
      className={cn('relative overflow-hidden', className)}
      {...{ backgroundColor, spacing, border, fluidContent, height }}
    >
      <div
        className={cn({
          'inset-0 size-full absolute': isBackgroundImageVariant,
        })}
      >
        <UniformSlot slot={slots.cardMedia} />
      </div>
      <div className={cn('relative flex flex-col gap-y-2', contentClassName)}>
        <UniformSlot slot={slots.cardContent} />
      </div>
    </Container>
  );
};

export default withFlattenParameters(Card);

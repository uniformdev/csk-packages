import { FC } from 'react';
import { UniformSlot } from '@uniformdev/canvas-next-rsc/component';
import Container from '@/components/ui/Container';
import { cn } from '@/utils/styling';
import { CardProps, CardVariants } from '.';

export const Card: FC<CardProps> = ({
  component,
  context,
  slots,
  backgroundColor,
  spacing,
  border,
  fluidContent,
  fullHeight,
  className,
  contentClassName,
}) => {
  const isBackgroundImageVariant = component.variant === CardVariants.BackgroundImage;

  return (
    <Container
      className={cn('relative overflow-hidden', className)}
      {...{ backgroundColor, spacing, border, fluidContent, fullHeight }}
    >
      <div
        className={cn({
          'inset-0 size-full absolute': isBackgroundImageVariant,
        })}
      >
        <UniformSlot data={component} context={context} slot={slots.cardMedia} />
      </div>
      <div className={cn('relative flex flex-col gap-y-2', contentClassName)}>
        <UniformSlot data={component} context={context} slot={slots.cardContent} />
      </div>
    </Container>
  );
};

export default Card;

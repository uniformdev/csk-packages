import { FC } from 'react';
import { ComponentProps, UniformSlot } from '@uniformdev/canvas-next-rsc/component';
import { ContainerParameters } from '@/components/canvas/Container';
import Container from '@/components/ui/Container';
import { cn } from '@/utils';

enum CardSlots {
  CardMedia = 'cardMedia',
  CardContent = 'cardContent',
}

export enum CardVariant {
  BackgroundImage = 'backgroundImage',
}

export type CardAdditionalProps = {
  className?: string;
  contentClassName?: string;
};

export type CardParameters = ContainerParameters;
export type CardProps = ComponentProps<CardParameters & CardAdditionalProps, CardSlots>;

const Card: FC<CardProps> = ({
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
  const isBackgroundImageVariant = component.variant === CardVariant.BackgroundImage;

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

import { FC } from 'react';
import { ComponentProps, UniformSlot } from '@uniformdev/canvas-next-rsc/component';
import { ContainerParameters } from '@uniformdev/csk-components/components/canvas';
import { Container } from '@uniformdev/csk-components/components/ui';
import { cn } from '@uniformdev/csk-components/utils/styling';

export type HeroGradientParameters = ContainerParameters & {
  gradientColor?: string;
};
enum HeroGradientSlots {
  Content = 'content',
  ButtonsSection = 'buttonsSection',
}

type HeroGradientProps = ComponentProps<HeroGradientParameters, HeroGradientSlots>;

const HeroGradient: FC<HeroGradientProps> = ({
  gradientColor,
  slots,
  component,
  context,
  backgroundColor,
  spacing,
  border,
  fluidContent,
  fullHeight,
}) => {
  const heroContent = <UniformSlot data={component} context={context} slot={slots.content} />;
  const heroCTA = <UniformSlot data={component} context={context} slot={slots.buttonsSection} />;

  return (
    <Container
      className={cn('bg-gradient-to-b', { [`from-${gradientColor}`]: !!gradientColor })}
      {...{ backgroundColor, spacing, border, fluidContent, fullHeight }}
    >
      <Container className="relative flex flex-col gap-8">
        <div className={cn('flex flex-col gap-4')}>{heroContent}</div>
        <div className={cn('flex flex-wrap gap-2')}>{heroCTA}</div>
      </Container>
    </Container>
  );
};

export default HeroGradient;

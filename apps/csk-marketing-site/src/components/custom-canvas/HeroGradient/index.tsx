import { FC } from 'react';
import { UniformSlot } from '@uniformdev/canvas-next-rsc-v2/component';
import { ContainerParameters } from '@uniformdev/csk-components/components/canvas/clientCompatible';
import { Container } from '@uniformdev/csk-components/components/ui';
import { ComponentProps } from '@uniformdev/csk-components/types/cskTypes';
import { cn } from '@uniformdev/csk-components/utils/styling';
import { withFlattenParameters } from '@uniformdev/csk-components/utils/withFlattenParameters';

export type HeroGradientParameters = ContainerParameters & {
  gradientColor?: string;
};
enum HeroGradientSlots {
  Content = 'content',
  ButtonsSection = 'buttonsSection',
}

type HeroGradientProps = ComponentProps<HeroGradientParameters, HeroGradientSlots>;

const HeroGradient: FC<HeroGradientProps & HeroGradientParameters> = ({
  gradientColor,
  slots,
  backgroundColor,
  spacing,
  border,
  fluidContent,
  height,
}) => {
  const heroContent = <UniformSlot slot={slots.content} />;
  const heroCTA = <UniformSlot slot={slots.buttonsSection} />;

  return (
    <Container
      className={cn('bg-gradient-to-b', { [`from-${gradientColor}`]: !!gradientColor })}
      {...{ backgroundColor, spacing, border, fluidContent, height }}
    >
      <Container className="relative flex flex-col gap-8">
        <div className={cn('flex flex-col gap-4')}>{heroContent}</div>
        <div className={cn('flex flex-wrap gap-2')}>{heroCTA}</div>
      </Container>
    </Container>
  );
};

export default withFlattenParameters(HeroGradient);

import { FC } from 'react';
import { Container } from '@uniformdev/csk-components/components/ui';
import { cn } from '@uniformdev/csk-components/utils/styling';
import { DemoHeroVariants, DemoHeroParameters } from '.';

type ColumnsVariantProps = {
  backgroundColor: DemoHeroParameters['backgroundColor'];
  spacing: DemoHeroParameters['spacing'];
  border: DemoHeroParameters['border'];
  fluidContent: DemoHeroParameters['fluidContent'];
  fullHeight: DemoHeroParameters['fullHeight'];
  variant?: DemoHeroVariants;
  demoHeroMedia: React.ReactNode;
  demoHeroContent: React.ReactNode;
  demoHeroCTA: React.ReactNode;
  textAlignmentClass: string;
  buttonAlignmentClass: string;
};

export const ColumnsVariant: FC<ColumnsVariantProps> = ({
  backgroundColor,
  spacing,
  border,
  fluidContent,
  fullHeight,
  variant,
  demoHeroMedia,
  demoHeroContent,
  demoHeroCTA,
  textAlignmentClass,
  buttonAlignmentClass,
}) => (
  <Container {...{ backgroundColor, spacing, border, fluidContent, fullHeight }}>
    <div className={cn('grid grid-cols-1 items-center gap-4 px-4 lg:grid-cols-2 xl:px-0')}>
      <div className={cn('aspect-square', { 'order-last': variant === DemoHeroVariants.ColumnsReverse })}>
        <div className="flex size-full items-center justify-center overflow-hidden">{demoHeroMedia}</div>
      </div>
      <div className="flex flex-col justify-center gap-8">
        <div className={cn('flex flex-col gap-4', textAlignmentClass)}>{demoHeroContent}</div>
        <div className={cn('flex flex-wrap gap-2 items-center', buttonAlignmentClass)}>{demoHeroCTA}</div>
      </div>
    </div>
  </Container>
);

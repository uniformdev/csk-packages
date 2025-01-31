import { FC } from 'react';
import { Container } from '@uniformdev/csk-components/components/ui';
import { cn } from '@uniformdev/csk-components/utils/styling';
import { DemoHeroParameters } from '.';

type DefaultVariantProps = {
  backgroundColor: DemoHeroParameters['backgroundColor'];
  spacing: DemoHeroParameters['spacing'];
  border: DemoHeroParameters['border'];
  fluidContent: DemoHeroParameters['fluidContent'];
  fullHeight: DemoHeroParameters['fullHeight'];
  demoHeroMedia: React.ReactNode;
  demoHeroContent: React.ReactNode;
  demoHeroCTA: React.ReactNode;
  textAlignmentClass: string;
  buttonAlignmentClass: string;
};

export const DefaultVariant: FC<DefaultVariantProps> = ({
  backgroundColor,
  spacing,
  border,
  fluidContent,
  fullHeight,
  demoHeroMedia,
  demoHeroContent,
  demoHeroCTA,
  textAlignmentClass,
  buttonAlignmentClass,
}) => (
  <Container className="relative overflow-hidden" {...{ backgroundColor, spacing, border, fluidContent, fullHeight }}>
    <div className="absolute left-0 top-0 size-full overflow-hidden">{demoHeroMedia}</div>
    <Container className="relative flex flex-col gap-8">
      <div className={cn('flex flex-col gap-4', textAlignmentClass)}>{demoHeroContent}</div>
      <div className={cn('flex flex-wrap gap-2 items-center', buttonAlignmentClass)}>{demoHeroCTA}</div>
    </Container>
  </Container>
);

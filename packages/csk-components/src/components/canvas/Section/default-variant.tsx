import { FC } from 'react';
import Container from '@/components/ui/Container';
import { cn } from '@/utils/styling';
import { SectionParameters } from '.';

type DefaultVariantProps = {
  backgroundColor?: SectionParameters['backgroundColor'];
  spacing?: SectionParameters['spacing'];
  border?: SectionParameters['border'];
  fluidContent?: SectionParameters['fluidContent'];
  /** @deprecated Use height prop instead */
  fullHeight?: SectionParameters['fullHeight'];
  /** @deprecated Use height prop instead */
  fitHeight?: SectionParameters['fitHeight'];
  height?: SectionParameters['height'];
  sectionMedia: React.ReactNode;
  sectionContent: React.ReactNode;
  sectionCTA: React.ReactNode;
  textAlignmentClass: string;
  buttonAlignmentClass: string;
};

export const DefaultVariant: FC<DefaultVariantProps> = ({
  backgroundColor,
  spacing,
  border,
  fluidContent,
  fullHeight,
  fitHeight,
  height,
  sectionMedia,
  sectionContent,
  sectionCTA,
  textAlignmentClass,
  buttonAlignmentClass,
}) => (
  <Container
    className="relative overflow-hidden"
    {...{ backgroundColor, spacing, border, fluidContent, fullHeight, fitHeight, height }}
  >
    <div className="absolute left-0 top-0 size-full overflow-hidden">{sectionMedia}</div>
    <Container className="relative flex flex-col gap-8">
      <div className={cn('flex flex-col gap-4', textAlignmentClass)}>{sectionContent}</div>
      <div className={cn('flex flex-wrap gap-2', buttonAlignmentClass)}>{sectionCTA}</div>
    </Container>
  </Container>
);

import { FC } from 'react';
import Container from '@/components/ui/Container';
import { cn } from '@/utils/styling';
import { SectionParameters } from '.';

type DefaultVariantProps = {
  backgroundColor?: SectionParameters['backgroundColor'];
  backgroundImageUrl?: string;
  spacing?: SectionParameters['spacing'];
  border?: SectionParameters['border'];
  fluidContent?: SectionParameters['fluidContent'];
  fullHeight?: SectionParameters['fullHeight'];
  previewMode?: string;
  sectionMedia: React.ReactNode;
  sectionContent: React.ReactNode;
  sectionCTA: React.ReactNode;
  textAlignmentClass: string;
  buttonAlignmentClass: string;
  anchor: SectionParameters['anchor'];
};

export const DefaultVariant: FC<DefaultVariantProps> = ({
  backgroundColor,
  backgroundImageUrl,
  spacing,
  border,
  fluidContent,
  fullHeight,
  sectionMedia,
  sectionContent,
  textAlignmentClass,
  anchor,
}) => (
  <Container
    className={cn('relative overflow-hidden')}
    {...{
      backgroundColor,
      spacing,
      border,
      fluidContent,
      fullHeight,
      id: anchor,
      ...(backgroundImageUrl
        ? {
            style: {
              backgroundImage: `url(${backgroundImageUrl})`,
            },
          }
        : null),
    }}
  >
    <div className="absolute left-0 top-0 size-full overflow-hidden">{sectionMedia}</div>
    <Container className="relative flex flex-col gap-8">
      <div className={cn('flex flex-col gap-4', textAlignmentClass)}>{sectionContent}</div>
    </Container>
  </Container>
);

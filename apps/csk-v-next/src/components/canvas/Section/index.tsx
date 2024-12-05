import { FC } from 'react';
import { ComponentProps, UniformSlot } from '@uniformdev/canvas-next-rsc/component';
import { ContainerParameters } from '@/components/canvas/Container';
import Container from '@/components/ui/Container';
import { cn } from '@/utils';

export enum ContentAlignment {
  Left = 'left',
  Center = 'center',
  Right = 'right',
}

export type SectionParameters = ContainerParameters & {
  contentAlignment?: ContentAlignment;
};
enum SectionSlots {
  SectionContent = 'sectionContent',
  SectionMedia = 'sectionMedia',
  SectionCTA = 'sectionCTA',
}
export enum SectionVariants {
  Columns = 'columns',
  ColumnsReverse = 'columnsReverse',
}

type SectionProps = ComponentProps<SectionParameters, SectionSlots>;

const Section: FC<SectionProps> = ({
  contentAlignment,
  slots,
  component,
  context,
  backgroundColor,
  spacing,
  border,
  fluidContent,
  fullHeight,
}) => {
  const variant = component.variant as SectionVariants | undefined;
  const { previewMode } = context || {};
  const sectionContent = (
    <div className={cn({ 'm-12': previewMode === 'editor' })}>
      <UniformSlot data={component} context={context} slot={slots.sectionContent} />
    </div>
  );
  const sectionCTA = <UniformSlot data={component} context={context} slot={slots.sectionCTA} />;
  const sectionMedia = <UniformSlot data={component} context={context} slot={slots.sectionMedia} />;

  const textAlignment = cn('text-center', {
    'text-start': contentAlignment === ContentAlignment.Left,
    'text-end': contentAlignment === ContentAlignment.Right,
  });
  const buttonAlignment = cn('justify-center', {
    '!justify-start': contentAlignment === ContentAlignment.Left,
    '!justify-end': contentAlignment === ContentAlignment.Right,
  });

  switch (variant) {
    case SectionVariants.Columns:
    case SectionVariants.ColumnsReverse:
      return (
        <Container {...{ backgroundColor, spacing, border, fluidContent, fullHeight }}>
          <div className={cn('grid grid-cols-1 items-center gap-4 px-4 lg:grid-cols-2 xl:px-0')}>
            <div className={cn('aspect-square', { 'order-last': variant === SectionVariants.ColumnsReverse })}>
              <div className="flex size-full items-center justify-center overflow-hidden">{sectionMedia}</div>
            </div>
            <div className="flex flex-col justify-center gap-8">
              <div className={cn('flex flex-col gap-4', textAlignment)}>{sectionContent}</div>
              <div className={cn('flex flex-wrap gap-2', buttonAlignment)}>{sectionCTA}</div>
            </div>
          </div>
        </Container>
      );
    default:
      return (
        <Container
          className={cn('relative overflow-hidden', { 'p-32': previewMode })}
          {...{ backgroundColor, spacing, border, fluidContent, fullHeight }}
        >
          <div className="absolute left-0 top-0 z-10 size-full overflow-hidden">{sectionMedia}</div>
          <Container className="relative z-20 flex flex-col gap-8">
            <div className={cn('flex flex-col gap-4', textAlignment)}>{sectionContent}</div>
            <div className={cn('flex flex-wrap gap-2', buttonAlignment)}>{sectionCTA}</div>
          </Container>
        </Container>
      );
  }
};

export default Section;

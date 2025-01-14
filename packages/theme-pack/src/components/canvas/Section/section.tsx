import { FC } from 'react';
import { UniformSlot } from '@uniformdev/canvas-next-rsc/component';
import { SectionProps, SectionVariants } from '.';
import { ColumnsVariant } from './columns-variant';
import { DefaultVariant } from './default-variant';
import { getButtonAlignmentClass, getTextAlignmentClass } from './style-utils';

export const Section: FC<SectionProps> = ({
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
  const variant = component.variant as SectionVariants;
  const { previewMode } = context || {};

  const variantProps = {
    variant,
    backgroundColor,
    spacing,
    border,
    fluidContent,
    fullHeight,
    textAlignmentClass: getTextAlignmentClass({ contentAlignment }),
    buttonAlignmentClass: getButtonAlignmentClass({ contentAlignment }),
    sectionMedia: <UniformSlot data={component} context={context} slot={slots.sectionMedia} />,
    sectionContent: <UniformSlot data={component} context={context} slot={slots.sectionContent} />,
    sectionCTA: <UniformSlot data={component} context={context} slot={slots.sectionCTA} />,
  };

  switch (variant) {
    case SectionVariants.Columns:
    case SectionVariants.ColumnsReverse:
      return <ColumnsVariant {...variantProps} />;
    default:
      return <DefaultVariant {...variantProps} previewMode={previewMode} />;
  }
};

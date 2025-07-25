import { FC } from 'react';
import { UniformSlot } from '@uniformdev/canvas-next-rsc-v2/component';
import { withFlattenParameters } from '@/utils/withFlattenParameters';
import { SectionParameters, SectionProps, SectionVariants } from '.';
import { ColumnsVariant } from './columns-variant';
import { DefaultVariant } from './default-variant';
import { getButtonAlignmentClass, getTextAlignmentClass } from './style-utils';

const Section: FC<SectionProps & SectionParameters> = ({
  contentAlignment,
  slots,
  backgroundColor,
  spacing,
  border,
  fluidContent,
  height,
  variant,
}) => {
  const variantProps = {
    backgroundColor,
    spacing,
    border,
    fluidContent,
    height,
    textAlignmentClass: getTextAlignmentClass({ contentAlignment }),
    buttonAlignmentClass: getButtonAlignmentClass({ contentAlignment }),
    sectionMedia: <UniformSlot slot={slots.sectionMedia} />,
    sectionContent: <UniformSlot slot={slots.sectionContent} />,
    sectionCTA: <UniformSlot slot={slots.sectionCTA} />,
  };

  switch (variant) {
    case SectionVariants.Columns:
    case SectionVariants.ColumnsReverse:
      return <ColumnsVariant variant={variant} {...variantProps} />;
    default:
      return <DefaultVariant {...variantProps} />;
  }
};

export default withFlattenParameters(Section);

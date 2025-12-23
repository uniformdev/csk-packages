import { FC } from 'react';
import { UniformSlot } from '@uniformdev/next-app-router/component';
import { withFlattenParameters } from '@/utils/withFlattenParameters';
import { ReviewParameters, ReviewProps, ReviewVariants } from '.';
import { DefaultVariant } from './default-variant';
import { MultiColumnVariant } from './multi-column-variant';

const Review: FC<ReviewProps & ReviewParameters> = ({ slots, variant, ...props }) => {
  const variantProps = {
    ...props,
    ReviewImage: <UniformSlot slot={slots.reviewImage} />,
    ReviewPersonInfo: <UniformSlot slot={slots.reviewPersonInfo} />,
    ReviewContent: <UniformSlot slot={slots.reviewContent} />,
  };

  switch (variant) {
    case ReviewVariants.MultiColumn:
      return <MultiColumnVariant variant={variant} slots={slots} {...variantProps} />;
    default:
      return <DefaultVariant variant={variant} slots={slots} {...variantProps} />;
  }
};

export default withFlattenParameters(Review);

import { FC } from 'react';
import { UniformSlot } from '@uniformdev/canvas-next-rsc/component';
import { ReviewProps, ReviewVariants } from '.';
import { DefaultVariant } from './default-variant';
import { MultiColumnVariant } from './multi-column-variant';

export const Review: FC<ReviewProps> = props => {
  const { component, context, slots } = props;
  const variant = component.variant as ReviewVariants | undefined;

  const variantProps = {
    ...props,
    ReviewImage: <UniformSlot context={context} data={component} slot={slots.reviewImage} />,
    ReviewPersonInfo: <UniformSlot context={context} data={component} slot={slots.reviewPersonInfo} />,
    ReviewContent: <UniformSlot context={context} data={component} slot={slots.reviewContent} />,
  };

  switch (variant) {
    case ReviewVariants.MultiColumn:
      return <MultiColumnVariant {...variantProps} />;
    default:
      return <DefaultVariant {...variantProps} />;
  }
};

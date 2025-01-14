import { FC } from 'react';
import { UniformSlot } from '@uniformdev/canvas-next-rsc/component';
import { TestimonialVariants, TestimonialProps } from '.';
import { DefaultVariant } from './default-variant';
import { WithLargeAvatarVariant } from './with-large-avatar-variant';
import { WithOverlappingImageVariant } from './with-overlapping-image-variant';

export const Testimonial: FC<TestimonialProps> = ({
  context,
  component,
  slots,
  backgroundColor,
  spacing,
  border,
  fluidContent,
  fullHeight,
}) => {
  const variant = component.variant as TestimonialVariants | undefined;

  const variantProps = {
    backgroundColor,
    spacing,
    border,
    fluidContent,
    fullHeight,
    testimonialPrimaryImage: <UniformSlot context={context} data={component} slot={slots.testimonialPrimaryImage} />,
    testimonialContent: <UniformSlot context={context} data={component} slot={slots.testimonialContent} />,
    testimonialAuthor: <UniformSlot context={context} data={component} slot={slots.testimonialAuthor} />,
    testimonialSecondaryImage: (
      <UniformSlot context={context} data={component} slot={slots.testimonialSecondaryImage} />
    ),
  };

  switch (variant) {
    case TestimonialVariants.WithLargeAvatar:
      return <WithLargeAvatarVariant {...variantProps} />;

    case TestimonialVariants.WithOverlappingImage:
      return <WithOverlappingImageVariant {...variantProps} />;

    default:
      return <DefaultVariant {...variantProps} />;
  }
};

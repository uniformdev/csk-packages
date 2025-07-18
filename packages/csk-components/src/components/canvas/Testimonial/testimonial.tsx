import { FC } from 'react';
import { UniformSlot } from '@uniformdev/canvas-next-rsc-v2/component';
import { withFlattenParameters } from '@/utils/withFlattenParameters';
import { TestimonialVariants, TestimonialProps, TestimonialParameters } from '.';
import { DefaultVariant } from './default-variant';
import { WithLargeAvatarVariant } from './with-large-avatar-variant';
import { WithOverlappingImageVariant } from './with-overlapping-image-variant';

const Testimonial: FC<TestimonialProps & TestimonialParameters> = ({
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
    testimonialPrimaryImage: <UniformSlot slot={slots.testimonialPrimaryImage} />,
    testimonialContent: <UniformSlot slot={slots.testimonialContent} />,
    testimonialAuthor: <UniformSlot slot={slots.testimonialAuthor} />,
    testimonialSecondaryImage: <UniformSlot slot={slots.testimonialSecondaryImage} />,
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

export default withFlattenParameters(Testimonial);

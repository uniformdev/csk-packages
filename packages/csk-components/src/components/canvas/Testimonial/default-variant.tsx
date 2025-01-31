import { FC } from 'react';
import { Container } from '@uniformdev/csk-components/components/ui';
import { TestimonialProps } from '.';

type WithLargeAvatarVariantProps = Pick<
  TestimonialProps,
  'backgroundColor' | 'spacing' | 'border' | 'fluidContent' | 'fullHeight'
> & {
  testimonialPrimaryImage: React.ReactNode;
  testimonialContent: React.ReactNode;
  testimonialAuthor: React.ReactNode;
  testimonialSecondaryImage: React.ReactNode;
};

export const DefaultVariant: FC<WithLargeAvatarVariantProps> = ({
  testimonialPrimaryImage,
  testimonialContent,
  testimonialAuthor,
  testimonialSecondaryImage,
  backgroundColor,
  spacing,
  border,
  fluidContent,
  fullHeight,
}) => (
  <Container {...{ backgroundColor, spacing, border, fluidContent, fullHeight }}>
    <div className="mx-auto flex flex-col items-center md:max-w-[80%]">
      <div>{testimonialSecondaryImage}</div>
      <div className="my-8">{testimonialContent}</div>
      <div className="size-10 rounded-full">{testimonialPrimaryImage}</div>
      <div className="mt-4 flex gap-3">{testimonialAuthor}</div>
    </div>
  </Container>
);

import { FC } from 'react';
import Container from '@/components/ui/Container';
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

export const WithOverlappingImageVariant: FC<WithLargeAvatarVariantProps> = ({
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
    <Container className="pb-10 lg:pb-0">
      <div className="mx-auto flex max-w-2xl flex-col items-center gap-10 lg:max-w-none lg:flex-row">
        <div className="-mt-7 aspect-[2/1] w-full shrink-0 overflow-hidden rounded-xl lg:-my-7 lg:aspect-[1/1.4] lg:max-w-xs">
          {testimonialPrimaryImage}
        </div>
        <div className="flex flex-col gap-y-8">
          <div className="">{testimonialContent}</div>
          <div className="flex items-center justify-between">
            <div className="gap-3">{testimonialAuthor}</div>
            {testimonialSecondaryImage}
          </div>
        </div>
      </div>
    </Container>
  </Container>
);

import { FC } from 'react';
import { ComponentProps, UniformSlot } from '@uniformdev/canvas-next-rsc/component';
import { ContainerParameters } from '@/components/canvas/Container';
import Container from '@/components/ui/Container';
import Rating from '@/components/ui/Rating';

export type ReviewParameters = ContainerParameters & {
  stars: number;
  starsColor: string;
  activeStarsColor: string;
  showRatingLabel: boolean;
};

enum ReviewSlots {
  ReviewImage = 'reviewImage',
  ReviewPersonInfo = 'reviewPersonInfo',
  ReviewContent = 'reviewContent',
}

export enum ReviewVariants {
  MultiColumn = 'multiColumn',
}

type ReviewProps = ComponentProps<ReviewParameters, ReviewSlots>;

const Review: FC<ReviewProps> = ({
  stars,
  starsColor,
  activeStarsColor,
  showRatingLabel,
  slots,
  component,
  context,
  backgroundColor,
  spacing,
  border,
  fluidContent,
  fullHeight,
}) => {
  const variant = component.variant as ReviewVariants | undefined;
  const ReviewImage = <UniformSlot context={context} data={component} slot={slots.reviewImage} />;
  const ReviewPersonInfo = <UniformSlot context={context} data={component} slot={slots.reviewPersonInfo} />;
  const ReviewContent = <UniformSlot context={context} data={component} slot={slots.reviewContent} />;

  switch (variant) {
    case ReviewVariants.MultiColumn:
      return (
        <Container {...{ backgroundColor, spacing, border, fluidContent, fullHeight }}>
          <div className="grid md:grid-cols-12">
            <div className="mb-2 md:col-span-4 md:my-0">
              <div className="mb-2 aspect-square size-12 rounded-full">{ReviewImage}</div>
              <div className="flex flex-col gap-y-1">{ReviewPersonInfo}</div>
            </div>
            <div className="my-2 md:col-span-4 md:my-0">
              <Rating
                rating={stars}
                showReviewLabel={showRatingLabel}
                starsColor={starsColor}
                activeStarsColor={activeStarsColor}
              />
            </div>
            <div className="mt-2 flex flex-col gap-y-3 md:col-span-4 md:my-0">{ReviewContent}</div>
          </div>
        </Container>
      );
    default:
      return (
        <Container {...{ backgroundColor, spacing, border, fluidContent, fullHeight }}>
          <div className="mx-auto flex lg:max-w-[60%]">
            <div className="aspect-square size-12 shrink-0 rounded-full">{ReviewImage}</div>
            <div className="ml-6">
              {ReviewPersonInfo}
              <div className="py-4">
                <Rating
                  rating={stars}
                  showReviewLabel={showRatingLabel}
                  starsColor={starsColor}
                  activeStarsColor={activeStarsColor}
                />
              </div>
              <div className="flex flex-col gap-y-5">{ReviewContent}</div>
            </div>
          </div>
        </Container>
      );
  }
};

export default Review;

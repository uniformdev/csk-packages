import { ContainerParameters } from '@/components/canvas/Container/parameters';
import { ComponentProps } from '@/types/cskTypes';

export type ReviewParameters = ContainerParameters & {
  stars?: number;
  starsColor?: string;
  activeStarsColor?: string;
  showRatingLabel?: boolean;
};

export enum ReviewVariants {
  MultiColumn = 'multiColumn',
}

export enum ReviewSlots {
  ReviewImage = 'reviewImage',
  ReviewPersonInfo = 'reviewPersonInfo',
  ReviewContent = 'reviewContent',
}

export type ReviewProps = ComponentProps<ReviewParameters, ReviewSlots>;

export { default } from './review';
export { ReviewEmptyPlaceholder } from './empty-placeholder';

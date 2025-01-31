import { ComponentProps } from '@uniformdev/canvas-next-rsc/component';
import { ContainerParameters } from '@uniformdev/csk-components/components/canvas';

export type ReviewParameters = ContainerParameters & {
  stars: number;
  starsColor: string;
  activeStarsColor: string;
  showRatingLabel: boolean;
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

export { Review as default } from './review';
export { ReviewEmptyPlaceholder } from './empty-placeholder';

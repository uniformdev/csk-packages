import { ContainerParameters } from '@/new-components/canvas/Container';
import { ComponentProps } from '@/types/canvasTypes';

export enum TestimonialVariants {
  WithLargeAvatar = 'withLargeAvatar',
  WithOverlappingImage = 'withOverlappingImage',
}

export type TestimonialParameters = ContainerParameters;

export enum TestimonialSlots {
  TestimonialSecondaryImage = 'testimonialSecondaryImage',
  TestimonialContent = 'testimonialContent',
  TestimonialPrimaryImage = 'testimonialPrimaryImage',
  TestimonialAuthor = 'testimonialAuthor',
}

export type TestimonialProps = ComponentProps<TestimonialParameters, TestimonialSlots>;

export { default } from './testimonial';
export { TestimonialEmptyPlaceholder } from './empty-placeholder';

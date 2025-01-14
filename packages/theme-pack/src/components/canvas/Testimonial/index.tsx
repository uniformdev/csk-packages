import { ComponentProps } from '@uniformdev/canvas-next-rsc/component';
import { ContainerParameters } from '@uniformdev/theme-pack/components/canvas';

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

export { Testimonial as default } from './testimonial';
export { TestimonialEmptyPlaceholder } from './empty-placeholder';

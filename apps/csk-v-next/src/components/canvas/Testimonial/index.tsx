import React, { FC } from 'react';
import { UniformSlot, ComponentProps } from '@uniformdev/canvas-next-rsc/component';
import { ContainerParameters } from '@/components/canvas/Container';
import Container from '@/components/ui/Container';

export enum TestimonialVariants {
  WithLargeAvatar = 'withLargeAvatar',
  WithOverlappingImage = 'withOverlappingImage',
}

export type TestimonialParameters = ContainerParameters;

enum TestimonialSlots {
  TestimonialSecondaryImage = 'testimonialSecondaryImage',
  TestimonialContent = 'testimonialContent',
  TestimonialPrimaryImage = 'testimonialPrimaryImage',
  TestimonialAuthor = 'testimonialAuthor',
}

type TestimonialProps = ComponentProps<TestimonialParameters, TestimonialSlots>;

const Testimonial: FC<TestimonialProps> = ({
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
  const testimonialSecondaryImage = (
    <UniformSlot context={context} data={component} slot={slots.testimonialSecondaryImage} />
  );
  const testimonialContent = <UniformSlot context={context} data={component} slot={slots.testimonialContent} />;
  const testimonialPrimaryImage = (
    <UniformSlot context={context} data={component} slot={slots.testimonialPrimaryImage} />
  );
  const testimonialAuthor = <UniformSlot context={context} data={component} slot={slots.testimonialAuthor} />;

  switch (variant) {
    case TestimonialVariants.WithLargeAvatar:
      return (
        <Container {...{ backgroundColor, spacing, border, fluidContent, fullHeight }}>
          <div className="mx-auto flex items-center gap-x-10 md:max-w-[80%]">
            <div className="hidden aspect-square w-full max-w-xs shrink-0 overflow-hidden rounded-xl lg:block">
              {testimonialPrimaryImage}
            </div>
            <div className="flex flex-col gap-y-8">
              <div className="">{testimonialContent}</div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-x-4">
                  <div className="block aspect-square w-10 overflow-hidden rounded-md lg:hidden">
                    {testimonialPrimaryImage}
                  </div>
                  <div className="gap-3">{testimonialAuthor}</div>
                </div>
                {testimonialSecondaryImage}
              </div>
            </div>
          </div>
        </Container>
      );
    case TestimonialVariants.WithOverlappingImage:
      return (
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
    default:
      return (
        <Container {...{ backgroundColor, spacing, border, fluidContent, fullHeight }}>
          <div className="mx-auto flex flex-col items-center md:max-w-[80%]">
            <div>{testimonialSecondaryImage}</div>
            <div className="my-8">{testimonialContent}</div>
            <div className="size-10 rounded-full">{testimonialPrimaryImage}</div>
            <div className="mt-4 flex gap-3">{testimonialAuthor}</div>
          </div>
        </Container>
      );
  }
};

export default Testimonial;

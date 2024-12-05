import { TestimonialVariants } from '@/components/canvas/Testimonial';
import { IMAGE_ASSET } from '../../assets';
import { createUniformParameter } from '../../utils';

export const getTestimonialDefaultContent = (variant?: string) => ({
  testimonialAuthor: [
    {
      type: 'text',
      parameters: createUniformParameter({
        tag: 'p',
        size: 'base',
        text: 'Hector Gibbons',
        weight: 'bold',
        color: variant === TestimonialVariants.WithOverlappingImage ? 'text-secondary' : 'text-primary',
      }),
    },
    {
      type: 'text',
      parameters: createUniformParameter({
        tag: 'p',
        text: 'CEO of Uniform',
        color: variant === TestimonialVariants.WithOverlappingImage ? 'text-secondary' : 'text-primary',
        weight: 'normal',
      }),
    },
  ],
  testimonialContent: [
    {
      type: 'text',
      parameters: createUniformParameter({
        tag: 'p',
        font: 'dm-sans',
        size: '2xl',
        text: 'Amet amet eget scelerisque tellus sit neque faucibus non eleifend. Integer eu praesent at a. Ornare arcu gravida natoque erat et cursus tortor consequat at. Vulputate gravida sociis enim nullam ultricies habitant malesuada lorem ac. Tincidunt urna dui pellentesque sagittis.Ornare arcu gravida natoque erat et cursus tortor consequat at',
        weight: 'bold',
        alignment: 'center',
        color: variant === TestimonialVariants.WithOverlappingImage ? 'text-secondary' : 'text-primary',
      }),
    },
  ],
  testimonialPrimaryImage: [
    {
      type: 'image',
      parameters: createUniformParameter({
        image: IMAGE_ASSET,
        objectFit: 'cover',
      }),
    },
  ],
  testimonialSecondaryImage: [
    {
      type: 'image',
      parameters: createUniformParameter({
        image: IMAGE_ASSET,
        width: '160',
        height: '64',
        objectFit: 'contain',
      }),
    },
  ],
});

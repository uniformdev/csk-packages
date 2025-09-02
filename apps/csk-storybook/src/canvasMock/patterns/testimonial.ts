import { createUniformParameter } from '@/utils';

export const testimonialContentCSK = {
  type: 'testimonial',
  variant: 'withOverlappingImage',
  parameters: createUniformParameter({
    spacing: {
      type: 'dex-space-control-parameter',
      value: {
        mobile: {
          marginTop: 'container-medium',
          paddingLeft: 'container-small',
          paddingRight: 'container-small',
        },
        tablet: {
          marginTop: 'container-medium',
          paddingLeft: 'container-small',
          marginBottom: 'container-medium',
          paddingRight: 'container-small',
        },
        desktop: {
          marginTop: 'container-medium',
          paddingLeft: 'container-small',
          marginBottom: 'container-medium',
          paddingRight: 'container-small',
        },
      },
    },
    displayName: {
      type: 'text',
      value: 'Testimonial - Overlapping Image',
    },
    fluidContent: {
      type: 'checkbox',
      value: true,
    },
    backgroundColor: {
      type: 'dex-color-palette-parameter',
      value: 'general-color-5',
    },
  }),
  slots: {
    testimonialAuthor: [
      {
        type: 'text',
        parameters: createUniformParameter({
          tag: 'p',
          size: { desktop: 'base' },
          text: 'John Doe',
          color: 'text-secondary',
          weight: 'bold',
        }),
      },
      {
        type: 'text',
        parameters: createUniformParameter({
          tag: 'p',
          size: { mobile: 'xs', tablet: 'sm', desktop: 'base' },
          text: 'Sr. Solutions Architect / Global Tech Firm',
          color: 'text-secondary',
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
          size: { desktop: '2xl' },
          text: '"The Component Starter Kit is great. It cut time to market in half. A big win!"',
          color: 'text-secondary',
          weight: 'bold',
          alignment: 'center',
        }),
      },
    ],
    testimonialPrimaryImage: [
      {
        type: 'image',
        parameters: createUniformParameter({
          image: {
            type: 'asset',
            value: [
              {
                _id: 'de055a55-b704-42af-88f6-10402e415e64',
                type: 'image',
                fields: {
                  url: {
                    type: 'text',
                    value:
                      'https://res.cloudinary.com/uniform-demos/image/upload/v1747643929/csk-v-next/storybook/man_rains9.png',
                  },
                  title: {
                    type: 'text',
                    value: 'john-doe.png',
                  },
                },
                _source: 'custom-url',
              },
            ],
          },
          border: 'border-image-radius-medium',
          objectFit: 'cover',
        }),
      },
    ],
    testimonialSecondaryImage: [
      {
        type: 'image',
        parameters: createUniformParameter({
          image: {
            type: 'asset',
            value: [
              {
                _id: '4e05dae1-7ef9-430d-a4cf-307200e377f2',
                type: 'image',
                fields: {
                  url: {
                    type: 'text',
                    value:
                      'https://res.cloudinary.com/uniform-demos/image/upload/v1753882068/csk-v-next/baseline/shared-images/icon-uniform-logo_white.svg',
                  },
                },
                _source: 'custom-url',
              },
            ],
          },
          width: 160,
          height: 64,
          objectFit: 'contain',
        }),
      },
    ],
  },
};

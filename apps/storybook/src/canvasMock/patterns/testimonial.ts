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
          text: 'Roger Willis',
          color: 'text-light',
          weight: 'bold',
        }),
      },
      {
        type: 'text',
        parameters: createUniformParameter({
          tag: 'p',
          size: { mobile: 'xs', tablet: 'sm', desktop: 'base' },
          text: 'Sr. Solutions Architect / Universal Technical Institute',
          color: 'text-light',
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
          color: 'text-light',
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
                _id: '1eae48e5-875a-4c0a-8973-9d690f605c18',
                type: 'image',
                fields: {
                  id: { type: 'text', value: 'cd44bf5e-bc21-4be5-b032-1cda94b4a6e1' },
                  url: {
                    type: 'text',
                    value:
                      'https://img.uniform.global/p/ZfA3kJm3TDeKyWey802IkQ/6DzWsi7nTOaP9naaIe62uw-roger_willis.png',
                  },
                  file: { type: 'file', value: '16d24fd8-e2ce-4526-9f57-96d3a288b30c' },
                  size: { type: 'number', value: 1600044 },
                  title: { type: 'text', value: 'roger_willis.png' },
                  width: { type: 'number', value: 1086 },
                  height: { type: 'number', value: 1538 },
                  mediaType: { type: 'text', value: 'image/png' },
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
                      'https://res.cloudinary.com/utidinary/image/upload/f_auto,q_auto,h_200,t_Auto-Quality-and-Format/UTI-Logo-Full-Color-White.svg',
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

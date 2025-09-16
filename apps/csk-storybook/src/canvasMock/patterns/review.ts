import { createUniformParameter } from '@/utils';

export const reviewContentCSK = {
  type: 'review',
  parameters: createUniformParameter({
    stars: {
      type: 'number',
      value: 5,
    },
    starsColor: {
      type: 'dex-color-palette-parameter',
      value: 'general-color-6',
    },
    displayName: {
      type: 'text',
      value: 'Hector Gibbons review',
    },
    showRatingLabel: {
      type: 'checkbox',
      value: true,
    },
    activeStarsColor: {
      type: 'dex-color-palette-parameter',
      value: 'button-primary-hover',
    },
  }),
  slots: {
    reviewImage: [
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
          border: {
            type: 'dex-token-selector-parameter',
            value: 'border-image-radius-small',
          },
          objectFit: {
            type: 'dex-segmented-control-parameter',
            value: 'cover',
          },
        }),
      },
    ],
    reviewContent: [
      {
        type: 'text',
        parameters: createUniformParameter({
          tag: 'p',
          size: {},
          text: 'The Component Starter Kit is great. It cut time to market in half. A big win!',
          weight: 'bold',
        }),
      },
      {
        type: 'text',
        parameters: createUniformParameter({
          tag: 'span',
          text: 'With a solid foundation of pre-built components and best practices, the Component Starter Kit eliminated repetitive setup work and boosted our velocity. Time to market was slashed, and developer experience noticeably improved.',
        }),
      },
    ],
    reviewPersonInfo: [
      {
        type: 'text',
        parameters: createUniformParameter({
          tag: 'p',
          size: {},
          text: 'John Doe',
          weight: 'bold',
        }),
      },
      {
        type: 'text',
        parameters: createUniformParameter({
          tag: 'p',
          size: {},
          text: 'July 12, 2021',
          color: 'text-tertiary',
          weight: 'normal',
        }),
      },
    ],
  },
};

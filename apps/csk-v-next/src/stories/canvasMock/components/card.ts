import { IMAGE_ASSET } from '../../assets';
import { createUniformParameter } from '../../utils';

export const cardDefault = {
  cardContent: [
    {
      type: 'richText',
      parameters: createUniformParameter({
        text: {
          type: 'richText',
          value: {
            root: {
              children: [
                {
                  children: [
                    {
                      detail: 0,
                      format: 1,
                      mode: 'normal',
                      style: '',
                      text: 'Freelancer',
                      type: 'text',
                      version: 1,
                    },
                  ],
                  direction: 'ltr',
                  format: '',
                  indent: 0,
                  type: 'heading',
                  version: 1,
                  tag: 'h2',
                },
                {
                  children: [
                    {
                      detail: 0,
                      format: 0,
                      mode: 'normal',
                      style: '',
                      text: 'The essentials to provide your best work for clients.',
                      type: 'text',
                      version: 1,
                    },
                  ],
                  direction: 'ltr',
                  format: '',
                  indent: 0,
                  type: 'paragraph',
                  version: 1,
                  textFormat: 0,
                  textStyle: '',
                },
                {
                  children: [
                    {
                      detail: 0,
                      format: 1,
                      mode: 'normal',
                      style: '',
                      text: '$30/month',
                      type: 'text',
                      version: 1,
                    },
                  ],
                  direction: 'ltr',
                  format: '',
                  indent: 0,
                  type: 'paragraph',
                  version: 1,
                  textFormat: 1,
                  textStyle: '',
                },
              ],
              direction: 'ltr',
              format: '',
              indent: 0,
              type: 'root',
              version: 1,
            },
          },
        },
      }),
    },
    {
      type: 'button',
      parameters: createUniformParameter({
        text: {
          type: 'text',
          value: 'Buy Plan',
        },
        buttonColor: {
          type: 'tp2-color-palette-parameter',
          value: 'button-primary',
        },
        textColor: {
          type: 'tp2-color-palette-parameter',
          value: 'text-light',
        },
        size: {
          type: 'tp2-size-parameter',
          value: 'button-small',
        },
      }),
    },
    {
      type: 'richText',
      parameters: createUniformParameter({
        text: {
          type: 'richText',
          value: {
            root: {
              children: [
                {
                  children: [
                    {
                      children: [
                        {
                          detail: 0,
                          format: 0,
                          mode: 'normal',
                          style: '',
                          text: '5 products',
                          type: 'text',
                          version: 1,
                        },
                      ],
                      direction: 'ltr',
                      format: '',
                      indent: 0,
                      type: 'listitem',
                      version: 1,
                      value: 1,
                    },
                    {
                      children: [
                        {
                          detail: 0,
                          format: 0,
                          mode: 'normal',
                          style: '',
                          text: 'Up to 1,000 subscribers',
                          type: 'text',
                          version: 1,
                        },
                      ],
                      direction: 'ltr',
                      format: '',
                      indent: 0,
                      type: 'listitem',
                      version: 1,
                      value: 2,
                    },
                    {
                      children: [
                        {
                          detail: 0,
                          format: 0,
                          mode: 'normal',
                          style: '',
                          text: 'Basic analytics',
                          type: 'text',
                          version: 1,
                        },
                      ],
                      direction: 'ltr',
                      format: '',
                      indent: 0,
                      type: 'listitem',
                      version: 1,
                      value: 3,
                    },
                    {
                      children: [
                        {
                          detail: 0,
                          format: 0,
                          mode: 'normal',
                          style: '',
                          text: '48-hour support response time',
                          type: 'text',
                          version: 1,
                        },
                      ],
                      direction: 'ltr',
                      format: '',
                      indent: 0,
                      type: 'listitem',
                      version: 1,
                      value: 4,
                    },
                  ],
                  direction: 'ltr',
                  format: '',
                  indent: 0,
                  type: 'list',
                  version: 1,
                  listType: 'bullet',
                  start: 1,
                  tag: 'ul',
                },
              ],
              direction: 'ltr',
              format: '',
              indent: 0,
              type: 'root',
              version: 1,
            },
          },
        },
      }),
    },
  ],
};

export const cardWithBackgroundImage = {
  cardMedia: [
    {
      type: 'image',
      parameters: createUniformParameter({
        image: IMAGE_ASSET,
        objectFit: 'cover',
        height: 300,
      }),
    },
  ],
  cardContent: [
    {
      type: 'text',
      parameters: createUniformParameter({
        tag: 'span',
        size: 'xl',
        text: 'Card Title',
        color: 'text-secondary',
      }),
    },
    {
      type: 'text',
      parameters: createUniformParameter({
        tag: 'span',
        size: 'base',
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent ut sagittis nunc, non ullamcorper eros. Etiam dui mi, sodales sed sodales id, ultricies sed dui. Vestibulum auctor diam a sagittis scelerisque. Nullam tellus felis, commodo eget ullamcorper sit amet, condimentum eu arcu. Praesent quis ante nec magna ullamcorper commodo. Praesent sed metus nec eros volutpat viverra. In mattis placerat sem, non finibus mi feugiat nec. Proin interdum tincidunt dictum.',
        color: 'text-secondary',
      }),
    },
  ],
  buttons: [
    {
      type: 'button',
      parameters: createUniformParameter({
        text: 'Button',
        link: { type: 'url', path: '/' },
        textColor: 'text-secondary',
        buttonColor: 'text-primary',
      }),
    },
  ],
};

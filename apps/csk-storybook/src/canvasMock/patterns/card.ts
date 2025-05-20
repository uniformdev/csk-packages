import { createUniformParameter } from '@/utils';

export const cardContentCSK = {
  type: 'card',
  parameters: createUniformParameter({
    border: 'border-primary',
    spacing: {
      marginTop: '',
      marginLeft: '',
      paddingTop: 'container-medium',
      marginRight: '',
      paddingLeft: 'container-medium',
      marginBottom: '',
      paddingRight: 'container-medium',
      paddingBottom: 'container-medium',
    },
    displayName: 'Card Default',
    fluidContent: true,
    backgroundColor: 'general-color-1',
  }),
  slots: {
    cardContent: [
      {
        type: 'richText',
        parameters: createUniformParameter({
          text: {
            root: {
              type: 'root',
              version: 1,
              children: [
                {
                  type: 'heading',
                  tag: 'h2',
                  version: 1,
                  children: [
                    {
                      type: 'text',
                      text: 'Component Starter Kit',
                      version: 1,
                      format: 1,
                    },
                  ],
                },
                {
                  type: 'paragraph',
                  version: 1,
                  children: [
                    {
                      type: 'text',
                      text: 'A production-ready starter kit with reusable components, design tokens, and modern frontend tooling.',
                      version: 1,
                    },
                  ],
                },
                {
                  type: 'paragraph',
                  version: 1,
                  children: [
                    {
                      type: 'text',
                      text: 'Free (Open Source)',
                      version: 1,
                      format: 1,
                    },
                  ],
                },
              ],
            },
          },
          color: 'text-primary',
        }),
      },
      {
        type: 'button',
        parameters: createUniformParameter({
          size: 'button-small',
          text: 'View Details',
          textColor: 'text-light',
          textWeight: 'normal',
          buttonColor: 'button-primary',
        }),
      },
      {
        type: 'richText',
        parameters: createUniformParameter({
          text: {
            root: {
              type: 'root',
              version: 1,
              children: [
                {
                  type: 'list',
                  tag: 'ul',
                  listType: 'bullet',
                  children: [
                    {
                      type: 'listitem',
                      value: 1,
                      children: [{ type: 'text', text: 'Prebuilt components', version: 1 }],
                    },
                    { type: 'listitem', value: 2, children: [{ type: 'text', text: 'Tailwind support', version: 1 }] },
                    { type: 'listitem', value: 3, children: [{ type: 'text', text: 'Storybook', version: 1 }] },
                    {
                      type: 'listitem',
                      value: 4,
                      children: [{ type: 'text', text: 'Vercel integration', version: 1 }],
                    },
                  ],
                },
              ],
            },
          },
          color: 'text-primary',
        }),
      },
    ],
  },
};

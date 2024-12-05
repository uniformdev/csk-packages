import { GITHUB_ICON_ASSET, STORYBOOK_ICON_ASSET, UNIFORM_LOGO_ASSET } from '../../assets';
import { createUniformParameter } from '../../utils';

export const footerDefault = {
  footerLogo: [
    {
      type: 'image',
      parameters: createUniformParameter({
        image: UNIFORM_LOGO_ASSET,
        width: 174,
        height: 50,
      }),
    },
  ],
  footerCopyright: [
    {
      type: 'richText',
      parameters: createUniformParameter({
        text: {
          type: 'richText',
          value: {
            root: {
              type: 'root',
              format: '',
              indent: 0,
              version: 1,
              children: [
                {
                  type: 'paragraph',
                  format: '',
                  indent: 0,
                  version: 1,
                  children: [
                    {
                      mode: 'normal',
                      text: '2024 Uniform Systems, Inc. All rights reserved.',
                      type: 'text',
                      style: '',
                      detail: 0,
                      format: 0,
                      version: 1,
                    },
                    {
                      type: 'linebreak',
                      version: 1,
                    },
                    {
                      type: 'linebreak',
                      version: 1,
                    },
                    {
                      mode: 'normal',
                      text: 'Built with 💙 by folks at Uniform, standing on the shoulders of these awesome open source projects:TailwindCSS, DaisyUI, React, and Next.js. Deployed to Vercel.',
                      type: 'text',
                      style: '',
                      detail: 0,
                      format: 0,
                      version: 1,
                    },
                  ],
                  direction: 'ltr',
                  textStyle: '',
                  textFormat: 0,
                },
              ],
              direction: 'ltr',
            },
          },
        },
        tag: 'span',
        size: 'base',
        color: 'text-primary',
      }),
    },
  ],
  footerContent: [
    {
      type: 'grid',
      parameters: createUniformParameter({
        gapX: '16',
        columnsCount: {
          mobile: '1',
          tablet: '2',
          desktop: '2',
        },
        fluidContent: true,
      }),
      slots: {
        gridInner: [
          {
            type: 'gridItem',
            parameters: createUniformParameter({
              columnStart: '1',
            }),
            slots: {
              inner: [
                {
                  type: 'text',
                  parameters: createUniformParameter({
                    tag: 'span',
                    text: 'KEY RESOURCES',
                    color: 'text-tertiary',
                    weight: 'bold',
                  }),
                },
                {
                  type: 'spacer',
                  parameters: createUniformParameter({
                    thickness: '10px',
                  }),
                },
                {
                  type: 'flex',
                  parameters: createUniformParameter({
                    gap: {
                      mobile: '2',
                      desktop: '2',
                    },
                    direction: {
                      mobile: 'col',
                      tablet: 'col',
                      desktop: 'col',
                    },
                    fluidContent: true,
                  }),
                  slots: {
                    flexItem: [
                      {
                        type: 'navigationLink',
                        parameters: createUniformParameter({
                          text: 'Documentation',
                          weight: 'bold',
                        }),
                      },
                      {
                        type: 'navigationLink',
                        parameters: createUniformParameter({
                          text: 'Storybook',
                          weight: 'bold',
                        }),
                      },
                      {
                        type: 'navigationLink',
                        parameters: createUniformParameter({
                          text: 'Demo',
                          weight: 'bold',
                        }),
                      },
                    ],
                  },
                },
              ],
            },
          },
          {
            type: 'gridItem',
            parameters: createUniformParameter({
              columnStart: '2',
            }),
            slots: {
              inner: [
                {
                  type: 'flex',
                  parameters: createUniformParameter({
                    gap: {
                      mobile: '2',
                      tablet: '2',
                      desktop: '2',
                    },
                    direction: {
                      mobile: 'row',
                      tablet: 'row',
                      desktop: 'row',
                    },
                  }),
                  slots: {
                    flexItem: [
                      {
                        type: 'navigationLink',
                        parameters: createUniformParameter({
                          icon: STORYBOOK_ICON_ASSET,
                          size: '2xl',
                          weight: 'normal',
                        }),
                      },
                      {
                        type: 'navigationLink',
                        parameters: createUniformParameter({
                          icon: GITHUB_ICON_ASSET,
                          size: '2xl',
                          weight: 'normal',
                        }),
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
};

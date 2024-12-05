import { createUniformParameter } from '../../utils';

export const accordionDefault = {
  accordionContent: [
    {
      type: 'text',
      parameters: createUniformParameter({
        tag: 'h2',
        size: '5xl',
        text: 'Frequently Asked Questions',
        color: 'text-primary',
      }),
    },
    {
      type: 'text',
      parameters: createUniformParameter({
        tag: 'span',
        size: 'base',
        text: 'Answer your customers possible questions here, it will increase the conversion rate as well as support or chat requests.',
        color: 'text-primary',
      }),
    },
  ],
  accordionItems: [
    {
      type: 'accordionItem',
      parameters: createUniformParameter({
        tag: 'span',
        size: '2xl',
        text: 'How much does the Component Starter Kit cost?',
        color: 'text-secondary',
        spacing: {
          paddingTop: 'container-small',
          paddingLeft: 'container-small',
          marginBottom: 'container-small',
          paddingRight: 'container-small',
          paddingBottom: 'container-small',
        },
        backgroundColor: 'general-color-2',
      }),
      slots: {
        accordionItemContent: [
          {
            type: 'text',
            parameters: createUniformParameter({
              tag: 'span',
              size: 'xl',
              text: 'Exactly $0. These components are totally open source and available for anyone to use.',
              color: 'text-primary',
            }),
          },
        ],
      },
    },
  ],
};

import { IMAGE_ASSET } from '../../assets';
import { createUniformParameter } from '../../utils';

export const getSectionDefaultContent = (variant?: string) => ({
  sectionContent: [
    {
      type: 'text',
      parameters: createUniformParameter({
        tag: 'span',
        text: 'SOMETHING FOR THE DEVELOPERS',
        color: !variant ? 'text-secondary' : 'text-tertiary',
      }),
    },
    {
      type: 'text',
      parameters: createUniformParameter({
        tag: 'span',
        size: '2xl',
        text: 'Built with the modern stack!',
        color: !variant ? 'text-secondary' : 'text-primary',
      }),
    },
    {
      type: 'text',
      parameters: createUniformParameter({
        tag: 'span',
        text: 'Our Component Starter Kit is built on a TNT stack - Typescript, Next.js, and TailwindCSS. That means it’s completely customizable and adaptable for what you need to build.',
        color: !variant ? 'text-secondary' : 'text-primary',
      }),
    },
  ],
  sectionCTA: [
    {
      type: 'button',
      parameters: createUniformParameter({
        text: 'Primary',
        link: {
          type: 'url',
          path: '/',
        },
        textColor: 'text-secondary',
        buttonColor: 'button-primary',
        size: 'button-small',
      }),
    },
    {
      type: 'button',
      parameters: createUniformParameter({
        text: 'Secondary',
        link: {
          type: 'url',
          path: '/',
        },
        textColor: !variant ? 'text-secondary' : 'text-primary',
        size: 'button-small',
      }),
    },
  ],
  sectionMedia: [
    {
      type: 'image',
      parameters: createUniformParameter({
        image: IMAGE_ASSET,
        objectFit: 'cover',
      }),
    },
  ],
});

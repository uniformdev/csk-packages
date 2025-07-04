import { ComponentInstance } from '@uniformdev/canvas';
import { CARET_ASSET, IMAGE_ASSET } from '@/assets';
import { createUniformParameter } from '@/utils';

// Reusable content for different stories
const createCommonContent = (centerContent: ComponentInstance[]) => ({
  headerLeftContent: [
    {
      type: 'text',
      parameters: createUniformParameter({
        tag: 'span',
        size: '2xl',
        text: 'Component Starter Kit',
        color: 'text-secondary',
      }),
    },
  ],
  headerRightContent: [
    {
      type: 'button',
      parameters: createUniformParameter({
        size: 'button-small',
        text: 'Join Us',
        textColor: 'text-secondary',
        buttonColor: 'button-secondary',
      }),
    },
  ],
  headerCenterContent: centerContent,
});

export const headerDefault = createCommonContent([]);

export const headerWithLinks = createCommonContent([
  {
    type: 'navigationLink',
    parameters: createUniformParameter({
      size: 'base',
      link: { type: 'url', path: '/' },
      text: 'All Components',
      color: 'text-secondary',
      hoverEffect: 'underline',
    }),
  },
  {
    type: 'navigationLink',
    parameters: createUniformParameter({
      size: 'base',
      link: { type: 'url', path: '/' },
      text: 'Containers',
      color: 'text-secondary',
      hoverEffect: 'opacity-75',
    }),
  },
  {
    type: 'navigationLink',
    parameters: createUniformParameter({
      size: 'base',
      link: { type: 'url', path: '/' },
      text: 'Marketing',
      color: 'text-secondary',
      hoverEffect: 'scale-105',
    }),
  },
  {
    type: 'navigationLink',
    parameters: createUniformParameter({
      size: 'base',
      link: { type: 'url', path: '/' },
      text: 'Atoms',
      color: 'text-secondary',
      hoverEffect: 'opacity-75',
    }),
  },
]);

export const headerWithGroups = createCommonContent([
  {
    type: 'navigationLink',
    parameters: createUniformParameter({
      size: 'base',
      link: { type: 'url', path: '/' },
      text: 'All Components',
      color: 'text-secondary',
      hoverEffect: 'none',
    }),
  },
  {
    type: 'navigationGroup',
    parameters: createUniformParameter({
      size: 'base',
      text: 'Containers',
      color: 'text-secondary',
      backgroundColor: 'general-color-2',
      caretIcon: CARET_ASSET,
      hoverEffect: 'underline',
    }),
    slots: {
      links: [
        {
          type: 'navigationLink',
          parameters: createUniformParameter({
            size: 'base',
            link: { type: 'url', path: '/' },
            text: 'Link 1',
            color: 'text-secondary',
            hoverEffect: 'opacity-75',
          }),
        },
        {
          type: 'navigationLink',
          parameters: createUniformParameter({
            size: 'base',
            link: { type: 'url', path: '/' },
            text: 'Link 2',
            color: 'text-secondary',
            hoverEffect: 'scale-105',
          }),
        },
        {
          type: 'navigationLink',
          parameters: createUniformParameter({
            size: 'base',
            link: { type: 'url', path: '/' },
            text: 'Link 3',
            color: 'text-secondary',
            hoverEffect: 'opacity-75',
          }),
        },
      ],
    },
  },
  {
    type: 'navigationGroup',
    parameters: createUniformParameter({
      size: 'base',
      text: 'Marketing',
      color: 'text-secondary',
      backgroundColor: 'general-color-2',
      caretIcon: CARET_ASSET,
      hoverEffect: 'underline',
    }),
    slots: {
      links: [
        {
          type: 'navigationLink',
          parameters: createUniformParameter({
            size: 'base',
            link: { type: 'url', path: '/' },
            text: 'Link 1',
            color: 'text-secondary',
            hoverEffect: 'opacity-75',
          }),
        },
        {
          type: 'navigationLink',
          parameters: createUniformParameter({
            size: 'base',
            link: { type: 'url', path: '/' },
            text: 'Link 2',
            color: 'text-secondary',
            hoverEffect: 'scale-105',
          }),
        },
      ],
    },
  },
]);

export const headerWithFlyout = createCommonContent([
  {
    type: 'navigationLink',
    parameters: createUniformParameter({
      size: 'base',
      link: { type: 'url', path: '/' },
      text: 'All Components',
      color: 'text-secondary',
      hoverEffect: 'underline',
    }),
  },
  {
    type: 'navigationFlyout',
    parameters: createUniformParameter({
      size: 'base',
      text: 'Containers',
      color: 'text-secondary',
      backgroundColor: 'general-color-2',
      caretIcon: CARET_ASSET,
      hoverEffect: 'underline',
    }),
    slots: {
      navigationFlyoutLeftContent: [
        {
          type: 'navigationLink',
          parameters: createUniformParameter({
            size: 'base',
            link: { type: 'url', path: '/' },
            text: 'Link 1',
            color: 'text-secondary',
            hoverEffect: 'opacity-75',
          }),
        },
        {
          type: 'navigationLink',
          parameters: createUniformParameter({
            size: 'base',
            link: { type: 'url', path: '/' },
            text: 'Link 2',
            color: 'text-secondary',
            hoverEffect: 'scale-105',
          }),
        },
      ],
      navigationFlyoutRightContent: [
        {
          type: 'card',
          variant: 'backgroundImage',
          parameters: createUniformParameter({
            spacing: {
              paddingTop: 'container-small',
              paddingLeft: 'container-small',
              marginBottom: 'container-small',
              paddingRight: 'container-small',
              paddingBottom: 'container-small',
            },
          }),
          slots: {
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
                  text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent ut sagittis nunc, non ullamcorper eros. Etiam dui mi, sodales sed sodales id, ultricies sed dui. Vestibulum auctor diam a sagittis scelerisque.',
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
                  buttonColor: 'button-secondary',
                }),
              },
            ],
          },
        },
      ],
    },
  },
]);

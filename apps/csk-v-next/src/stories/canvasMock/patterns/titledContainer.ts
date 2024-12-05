import { IMAGE_ASSET } from '../../assets';
import { createUniformParameter } from '../../utils';

export const titledContainerContent = {
  type: 'flex',
  parameters: createUniformParameter({
    gap: {
      mobile: '4',
      tablet: '4',
      desktop: '4',
    },
    direction: {
      mobile: 'col',
      tablet: 'col',
      desktop: 'col',
    },
    alignItems: '',
    displayName: 'Component Starter Kit',
    justifyContent: {
      desktop: 'center',
    },
    spacing: {},
  }),
  slots: {
    flexItem: [
      {
        type: 'text',
        parameters: createUniformParameter({
          tag: 'span',
          size: {
            mobile: '3xl',
            tablet: '3xl',
            desktop: '3xl',
          },
          text: 'Component Starter Kit',
          weight: 'normal',
        }),
      },
      {
        type: 'text',
        parameters: createUniformParameter({
          tag: 'span',
          size: {
            mobile: '3xl',
            tablet: '3xl',
            desktop: 'xl',
          },
          text: 'An essential set of components you need to start building personalized web experiences with Uniform.',
          weight: 'normal',
        }),
      },
      {
        type: 'section',
        variant: 'welcome-hero',
        parameters: createUniformParameter({
          spacing: {
            paddingTop: 'container-xlarge',
            paddingLeft: 'container-small',
            paddingRight: 'container-small',
            paddingBottom: 'container-xlarge',
          },
          displayName: 'Welcome Hero',
          fluidContent: true,
          contentAlignment: 'center',
        }),
        slots: {
          sectionCTA: [
            {
              type: 'button',
              parameters: createUniformParameter({
                size: 'button-medium',
                text: 'Browse the components',
                textColor: 'text-light',
                textWeight: 'normal',
                buttonColor: 'button-primary',
                iconPosition: 'left',
                textTransform: 'uppercase',
              }),
            },
          ],
          sectionMedia: [
            {
              type: 'image',
              parameters: createUniformParameter({
                image: IMAGE_ASSET,
                objectFit: 'cover',
                overlayColor: 'general-color-1',
                overlayOpacity: '0',
              }),
            },
          ],
          sectionContent: [
            {
              type: 'text',
              parameters: createUniformParameter({
                tag: 'span',
                font: 'dm-sans',
                size: 'xl',
                text: 'Uniform',
                color: 'text-light',
                weight: 'bold',
                alignment: 'center',
                transform: 'uppercase',
              }),
            },
            {
              type: 'text',
              parameters: createUniformParameter({
                tag: 'h1',
                font: 'dm-sans',
                size: {
                  mobile: '5xl',
                  tablet: '5xl',
                  desktop: '7xl',
                },
                color: 'text-light',
                weight: 'bold',
                alignment: 'center',
              }),
            },
            {
              type: 'text',
              parameters: createUniformParameter({
                tag: 'p',
                font: 'dm-sans',
                size: 'xl',
                color: 'text-light',
                weight: 'normal',
                alignment: 'center',
              }),
            },
          ],
        },
      },
    ],
  },
};

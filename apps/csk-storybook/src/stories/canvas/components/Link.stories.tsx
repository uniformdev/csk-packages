import { Image, Link, LinkParameters, Text } from '@uniformdev/csk-components/components/canvas/serverClient';
import createComponentResolver, { ComponentMapping } from '@uniformdev/csk-components/utils/createComponentResolver';
import { UniformComposition } from '@uniformdev/next-app-router';
import { UNIFORM_LOGO_ASSET } from '@/assets';
import { createFakeCompositionData, createUniformParameter } from '@/utils';
import { ArgTypes, Meta, StoryObj } from '@storybook/nextjs';

const meta: Meta<typeof Link> = {
  title: 'Component Starter Kit/Components/Link',
  component: Link,
};

export default meta;
type Story = StoryObj<typeof Link>;

const argTypes: Partial<ArgTypes<LinkParameters>> = {
  openInNewTab: { control: 'check' },
};

const componentMapper: ComponentMapping = {
  link: Link,
  text: Text,
  image: Image,
};

export const WithImage: Story = {
  args: {
    link: { type: 'url', path: '/' },
    openInNewTab: false,
  },
  argTypes,
  render: args => {
    const route = createFakeCompositionData(
      'link',
      undefined,
      {
        ...args,
      },
      {
        linkContent: [
          {
            type: 'image',
            parameters: createUniformParameter({
              image: UNIFORM_LOGO_ASSET,
              objectFit: 'contain',
              width: 174,
              height: 50,
            }),
          },
        ],
      }
    );
    return <UniformComposition {...route} resolveComponent={createComponentResolver(componentMapper)} />;
  },
};

export const WithText: Story = {
  args: {
    link: { type: 'url', path: '/' },
    openInNewTab: false,
  },
  argTypes,
  render: args => {
    const route = createFakeCompositionData(
      'link',
      undefined,
      {
        ...args,
      },
      {
        linkContent: [
          {
            type: 'text',
            parameters: createUniformParameter({
              tag: 'span',
              size: '2xl',
              text: 'Built with the modern stack!',
              color: 'text-primary',
            }),
          },
        ],
      }
    );
    return <UniformComposition {...route} resolveComponent={createComponentResolver(componentMapper)} />;
  },
};

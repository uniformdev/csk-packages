import { UniformComposition } from '@uniformdev/canvas-next-rsc';
import { Image, Link, LinkParameters, Text } from '@uniformdev/csk-components/components/canvas';
import createComponentResolver, { ComponentMapping } from '@uniformdev/csk-components/utils/createComponentResolver';
import { UNIFORM_LOGO_ASSET } from '@/assets';
import { createFakeCompositionData, createUniformParameter, fakeContext } from '@/utils';
import { ArgTypes, Meta, StoryObj } from '@storybook/react';

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
  link: { component: Link },
  text: { component: Text },
  image: { component: Image },
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
    return (
      <UniformComposition
        serverContext={fakeContext}
        params={Promise.resolve({})}
        searchParams={Promise.resolve({})}
        route={route}
        resolveComponent={createComponentResolver(componentMapper)}
        mode="server"
      />
    );
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
    return (
      <UniformComposition
        serverContext={fakeContext}
        params={Promise.resolve({})}
        searchParams={Promise.resolve({})}
        route={route}
        resolveComponent={createComponentResolver(componentMapper)}
        mode="server"
      />
    );
  },
};

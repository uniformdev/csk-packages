import { UniformComposition } from '@uniformdev/canvas-next-rsc';
import {
  Text,
  Banner,
  BannerParameters,
  BannerContentAlignment as ContentAlignment,
} from '@uniformdev/csk-components/components/canvas';
import createComponentResolver from '@uniformdev/csk-components/utils/createComponentResolver';
import { ContainerArgTypes } from '@/argTypes';
import { createFakeCompositionData, createUniformParameter, fakeContext } from '@/utils';
import { Meta, StoryObj, ArgTypes } from '@storybook/react';

// Define meta for the component
const meta: Meta<typeof Banner> = {
  title: 'Component Starter Kit/Components/Banner',
  component: Banner,
};

export default meta;
type Story = StoryObj<typeof Banner>;

const { displayName: _title, fullHeight: _fullHeight, ...baseContainerArgTypes } = ContainerArgTypes;

// Define argument types for the storybook controls
const argTypes: Partial<ArgTypes<BannerParameters>> = {
  iconColor: { control: 'color' },
  contentAlignment: {
    control: 'select',
    options: Object.values(ContentAlignment),
  },
  floating: { control: 'boolean' },
  ...baseContainerArgTypes,
};

// Utility to render the story based on Banner variants
const renderStory = () => (args: BannerParameters) => {
  const route = createFakeCompositionData(
    'banner',
    undefined,
    { ...args },
    {
      bannerContent: [
        {
          type: 'text',
          parameters: createUniformParameter({
            text: 'Welcome to our website!',
            color: 'general-color-1',
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
      resolveComponent={createComponentResolver({
        banner: { component: Banner },
        text: { component: Text },
      })}
      mode="server"
    />
  );
};

// Default story for the Banner component
export const Default: Story = {
  args: {
    backgroundColor: 'general-color-2',
    iconColor: 'general-color-1',
    spacing: {
      paddingTop: 'container-medium',
      paddingBottom: 'container-medium',
    },
    contentAlignment: ContentAlignment.Center,
    floating: false,
  },
  argTypes,
  render: renderStory(),
};

// Floating Banner at the top of the screen
export const FloatingTop: Story = {
  args: {
    backgroundColor: 'general-color-2',
    iconColor: 'general-color-1',
    spacing: {
      paddingTop: 'container-medium',
      paddingBottom: 'container-medium',
    },
    contentAlignment: ContentAlignment.Center,
    floating: true,
  },
  argTypes,
  render: renderStory(),
};

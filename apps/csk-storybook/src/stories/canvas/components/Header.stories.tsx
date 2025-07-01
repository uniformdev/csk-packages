import { ComponentInstance } from '@uniformdev/canvas';
import { UniformComposition } from '@uniformdev/canvas-next-rsc';
import {
  Text,
  NavigationFlyout,
  NavigationGroup,
  NavigationLink,
  Button,
  Card,
  Image,
  Header,
  HeaderParameters,
} from '@uniformdev/csk-components/components/canvas';
import createComponentResolver from '@uniformdev/csk-components/utils/createComponentResolver';
import { headerDefault, headerWithFlyout, headerWithGroups, headerWithLinks } from '@/canvasMock/components/header';
import { createFakeCompositionData, fakeContext } from '@/utils';
import { ArgTypes, Meta, StoryObj } from '@storybook/react';
import theme from '../../../../themeData.json';

const colorKeys = theme.colors.map(color => color.colorKey);

const meta: Meta<typeof Header> = {
  title: 'Component Starter Kit/Components/Header',
  component: Header,
};

export default meta;
type Story = StoryObj<typeof Header>;

const argTypes: Partial<ArgTypes<HeaderParameters>> = {
  backgroundColor: {
    control: 'select',
    options: colorKeys,
  },
  color: {
    control: 'select',
    options: colorKeys,
  },
  spacing: {
    control: 'object',
    description: 'Spacing configuration for the header',
  },
  border: {
    control: 'text',
    description: 'Border styling for the header',
  },
};

const renderStory = (content: Record<string, ComponentInstance[]>) => (args: HeaderParameters) => {
  const route = createFakeCompositionData(
    'header',
    undefined,
    {
      ...args,
    },
    content
  );

  return (
    <UniformComposition
      serverContext={fakeContext}
      params={Promise.resolve({})}
      searchParams={Promise.resolve({})}
      route={route}
      resolveComponent={createComponentResolver({
        header: { component: Header },
        text: { component: Text },
        button: { component: Button },
        navigationFlyout: { component: NavigationFlyout },
        navigationGroup: { component: NavigationGroup },
        navigationLink: { component: NavigationLink },
        card: { component: Card },
        image: { component: Image },
      })}
      mode="server"
    />
  );
};

// Stories
export const Default: Story = {
  args: {
    backgroundColor: 'general-color-2',
    color: 'general-color-1',
    spacing: {
      paddingTop: 'container-small',
      paddingBottom: 'container-small',
    },
  },
  argTypes,
  render: renderStory(headerDefault),
};

export const WithLinks: Story = {
  args: Default.args,
  argTypes,
  render: renderStory(headerWithLinks),
};

export const WithGroups: Story = {
  args: Default.args,
  argTypes,
  render: renderStory(headerWithGroups),
};

export const WithFlyout: Story = {
  args: Default.args,
  argTypes,
  render: renderStory(headerWithFlyout),
};

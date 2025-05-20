import { UniformComposition } from '@uniformdev/canvas-next-rsc';
import { Tab, Text, Tabs, TabsParameters, TabsVariants } from '@uniformdev/csk-components/components/canvas';
import createComponentResolver, { ComponentMapping } from '@uniformdev/csk-components/utils/createComponentResolver';
import { ContainerArgTypes } from '@/argTypes';
import { tabsDefault } from '@/canvasMock/components/tabs';
import { createFakeCompositionData, fakeContext } from '@/utils';
import { ArgTypes, Meta, StoryObj } from '@storybook/react';
import theme from '../../../../tailwind.config.theme.json';

const meta: Meta<typeof Tabs> = {
  title: 'Component Starter Kit/Components/Tabs',
  component: Tabs,
};

const colorKeys = Object.keys(theme.extend.colors || {});

export default meta;
type Story = StoryObj<typeof Tabs>;

const { displayName: _, ...baseContainerArgTypes } = ContainerArgTypes;

const argTypes: Partial<ArgTypes<TabsParameters>> = {
  displayName: { control: 'text' },
  color: { control: 'select', options: colorKeys },
  ...baseContainerArgTypes,
};

const getRouteData = (args: TabsParameters, variant = TabsVariants.Default) =>
  createFakeCompositionData(
    'tabs',
    variant,
    {
      ...args,
    },
    tabsDefault
  );

const componentMapper: ComponentMapping = {
  tabs: { component: Tabs },
  tab: { component: Tab },
  text: { component: Text },
};

export const Default: Story = {
  args: {
    displayName: 'Tabs',
    color: 'text-primary',
    backgroundColor: 'text-secondary',
    fluidContent: false,
    fullHeight: false,
  },
  argTypes,
  render: (args: TabsParameters) => {
    const route = getRouteData(args, TabsVariants.Default);
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

export const Bordered: Story = {
  args: {
    displayName: 'Tabs',
    color: 'text-primary',
    backgroundColor: 'text-secondary',
    fluidContent: false,
    fullHeight: false,
  },
  argTypes,
  render: (args: TabsParameters) => {
    const route = getRouteData(args, TabsVariants.Bordered);
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

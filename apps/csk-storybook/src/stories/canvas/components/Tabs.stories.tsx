import { Tab, Text } from '@uniformdev/csk-components/components/canvas/serverClient';
import { TabsParameters, TabsVariants, Tabs } from '@uniformdev/csk-components/components/canvas/serverOnly';
import createComponentResolver, { ComponentMapping } from '@uniformdev/csk-components/utils/createComponentResolver';
import { compositionCache } from '@uniformdev/csk-components/utils/getSlotComponents';
import { UniformComposition } from '@uniformdev/next-app-router';
import { ContainerArgTypes } from '@/argTypes';
import { tabsDefault } from '@/canvasMock/components/tabs';
import { createFakeCompositionData } from '@/utils';
import { ArgTypes, Meta, StoryObj } from '@storybook/nextjs';
import theme from '../../../../themeData.json';

const meta: Meta<typeof Tabs> = {
  title: 'Component Starter Kit/Components/Tabs',
  component: Tabs,
};

const colorKeys = theme.colors.map(color => color.colorKey);

export default meta;
type Story = StoryObj<typeof Tabs>;

const { displayName: _, ...baseContainerArgTypes } = ContainerArgTypes;

const argTypes: Partial<ArgTypes<TabsParameters>> = {
  displayName: { control: 'text' },
  color: { control: 'select', options: colorKeys },
  ...baseContainerArgTypes,
};

const getRouteData = (args: TabsParameters, variant?: TabsVariants) =>
  createFakeCompositionData(
    'tabs',
    variant,
    {
      ...args,
    },
    tabsDefault
  );

const componentMapper: ComponentMapping = {
  tabs: Tabs,
  tab: Tab,
  text: Text,
};

export const Default: Story = {
  args: {
    displayName: 'Tabs',
    color: 'text-primary',
    backgroundColor: 'text-secondary',
    fluidContent: false,
  },
  argTypes,
  render: (args: TabsParameters) => {
    const route = getRouteData(args);
    return (
      <UniformComposition
        {...route}
        resolveComponent={createComponentResolver(componentMapper)}
        compositionCache={compositionCache}
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
  },
  argTypes,
  render: (args: TabsParameters) => {
    const route = getRouteData(args, TabsVariants.Bordered);
    return <UniformComposition {...route} resolveComponent={createComponentResolver(componentMapper)} />;
  },
};

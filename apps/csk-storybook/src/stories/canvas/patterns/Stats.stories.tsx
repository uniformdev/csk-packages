import { Flex, Text, Grid, GridParameters } from '@uniformdev/csk-components/components/canvas/serverClient';
import createComponentResolver from '@uniformdev/csk-components/utils/createComponentResolver';
import { UniformComposition } from '@uniformdev/next-app-router';
import { simpleStatsContent, gridStatsContent } from '@/canvasMock/patterns/stats';
import { createFakeCompositionData } from '@/utils';
import { ArgTypes, Meta, StoryObj } from '@storybook/nextjs';

const meta: Meta<typeof Grid> = {
  title: 'Component Starter Kit/Patterns/Stats',
  component: Grid,
};

export default meta;
type Story = StoryObj<typeof Grid>;

const argTypes: Partial<ArgTypes<GridParameters>> = {
  displayName: { control: 'text' },
};

const renderStory = (content: typeof simpleStatsContent) => (args: GridParameters) => {
  const route = createFakeCompositionData(
    'grid',
    content.type,
    {
      ...args,
      ...content.parameters,
    },
    content.slots
  );

  return (
    <UniformComposition
      {...route}
      resolveComponent={createComponentResolver({
        grid: Grid,
        flex: Flex,
        text: Text,
      })}
    />
  );
};

export const Default: Story = {
  args: {
    displayName: 'Simple Stat',
  },
  argTypes,
  render: renderStory(simpleStatsContent),
};

export const GridStats: Story = {
  args: {
    displayName: 'Grid Stat',
  },
  argTypes,
  render: renderStory(gridStatsContent),
};

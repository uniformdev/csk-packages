import { UniformComposition } from '@uniformdev/canvas-next-rsc';
import { Button, Image, Section, Text } from '@/components/canvas';
import Flex, { FlexParameters } from '@/components/canvas/Flex';
import { ContainerArgTypes } from '@/stories/argTypes';
import { createFakeCompositionData, fakeContext } from '@/stories/utils';
import createComponentResolver from '@/utils/createComponentResolver';
import { ArgTypes, Meta, StoryObj } from '@storybook/react';
import { titledContainerContent } from '../../canvasMock/patterns/titledContainer';

const meta: Meta<typeof Flex> = {
  title: 'Component Starter Kit/Patterns/Titled Container',
  component: Flex,
};

export default meta;
type Story = StoryObj<typeof Flex>;

const { displayName: _ } = ContainerArgTypes;

const argTypes: Partial<ArgTypes<FlexParameters>> = {
  displayName: { control: 'text' },
  backgroundColor: ContainerArgTypes.backgroundColor,
  fluidContent: ContainerArgTypes.fluidContent,
};

export const Default: Story = {
  args: {
    displayName: 'Titled Container',
  },
  argTypes,
  render: (args: FlexParameters) => {
    const route = createFakeCompositionData(
      'flex',
      titledContainerContent.type,
      {
        ...args,
        ...titledContainerContent.parameters,
      },
      titledContainerContent.slots
    );
    return (
      <UniformComposition
        serverContext={fakeContext}
        params={{}}
        searchParams={{}}
        route={route}
        resolveComponent={createComponentResolver({
          section: { component: Section },
          text: { component: Text },
          button: { component: Button },
          image: { component: Image },
          flex: { component: Flex },
        })}
        mode="server"
      />
    );
  },
};

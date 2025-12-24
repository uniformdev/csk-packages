import {
  Button,
  Image,
  Section,
  Text,
  Flex,
  FlexParameters,
} from '@uniformdev/csk-components/components/canvas/serverClient';
import createComponentResolver from '@uniformdev/csk-components/utils/createComponentResolver';
import { UniformComposition } from '@uniformdev/next-app-router';
import { ContainerArgTypes } from '@/argTypes';
import { titledContainerContent } from '@/canvasMock/patterns/titledContainer';
import { createFakeCompositionData } from '@/utils';
import { ArgTypes, Meta, StoryObj } from '@storybook/nextjs';

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
        {...route}
        resolveComponent={createComponentResolver({
          section: Section,
          text: Text,
          button: Button,
          image: Image,
          flex: Flex,
        })}
      />
    );
  },
};

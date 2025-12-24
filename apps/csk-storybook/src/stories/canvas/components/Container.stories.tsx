import { Container, ContainerParameters, Text } from '@uniformdev/csk-components/components/canvas/serverClient';
import createComponentResolver from '@uniformdev/csk-components/utils/createComponentResolver';
import { UniformComposition } from '@uniformdev/next-app-router';
import { ContainerArgTypes } from '@/argTypes';
import { createFakeCompositionData, createUniformParameter } from '@/utils';
import { ArgTypes, Meta, StoryObj } from '@storybook/nextjs';

const meta: Meta<typeof Container> = {
  title: 'Component Starter Kit/Components/Container',
  component: Container,
};

export default meta;
type Story = StoryObj<typeof Container>;

const argTypes: Partial<ArgTypes<ContainerParameters>> = {
  ...ContainerArgTypes,
};

const renderStory = (label: string) => (args: ContainerParameters) => {
  const route = createFakeCompositionData(
    'container',
    undefined,
    {
      ...args,
    },
    {
      containerContent: [
        {
          type: 'text',
          parameters: createUniformParameter({
            text: label,
            tag: 'h1',
            size: '5xl',
            color: 'text-primary',
          }),
        },
      ],
    }
  );
  return (
    <UniformComposition
      {...route}
      resolveComponent={createComponentResolver({
        container: Container,
        text: Text,
      })}
    />
  );
};
export const Default: Story = {
  args: {
    displayName: 'Simple Container',
    backgroundColor: 'text-secondary',
    fluidContent: false,
  },
  argTypes,
  render: renderStory('Simple Container'),
};

export const FluidContainer: Story = {
  args: {
    displayName: 'Fluid Container',
    backgroundColor: 'text-secondary',
    fluidContent: true,
  },
  argTypes,
  render: renderStory('Fluid Container'),
};

export const ScreenHeightContainer: Story = {
  args: {
    displayName: 'Screen Height Container',
    backgroundColor: 'text-secondary',
    fluidContent: false,
    height: 'screen',
  },
  argTypes,
  render: renderStory('Screen Height Container'),
};

export const WithSpacingContainer: Story = {
  args: {
    displayName: 'With Spacing Container',
    backgroundColor: 'text-secondary',
    spacing: {
      marginTop: 'container-small',
      marginBottom: 'container-small',
      marginRight: 'container-small',
      marginLeft: 'container-small',
      paddingTop: 'container-medium',
      paddingBottom: 'container-medium',
      paddingRight: 'container-medium',
      paddingLeft: 'container-medium',
    },
    fluidContent: false,
  },
  argTypes,
  render: renderStory('With Spacing Container'),
};

import { UniformComposition } from '@uniformdev/canvas-next-rsc';
import Container, { ContainerParameters } from '@/components/canvas/Container';
import Text from '@/components/canvas/Text';
import { ContainerArgTypes } from '@/stories/argTypes';
import { createFakeCompositionData, createUniformParameter, fakeContext } from '@/stories/utils';
import createComponentResolver from '@/utils/createComponentResolver';
import { ArgTypes, Meta, StoryObj } from '@storybook/react';

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
      serverContext={fakeContext}
      params={{}}
      searchParams={{}}
      route={route}
      resolveComponent={createComponentResolver({
        container: { component: Container },
        text: { component: Text },
      })}
      mode="server"
    />
  );
};
export const Default: Story = {
  args: {
    displayName: 'Simple Container',
    backgroundColor: 'text-secondary',
    fluidContent: false,
    fullHeight: false,
  },
  argTypes,
  render: renderStory('Simple Container'),
};

export const FluidContainer: Story = {
  args: {
    displayName: 'Fluid Container',
    backgroundColor: 'text-secondary',
    fluidContent: true,
    fullHeight: false,
  },
  argTypes,
  render: renderStory('Fluid Container'),
};

export const FullHeightContainer: Story = {
  args: {
    displayName: 'Full Height Container',
    backgroundColor: 'text-secondary',
    fluidContent: false,
    fullHeight: true,
  },
  argTypes,
  render: renderStory('Full Height Container'),
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
    fullHeight: true,
  },
  argTypes,
  render: renderStory('With Spacing Container'),
};

import { UniformComposition } from '@uniformdev/canvas-next-rsc';
import { Image, Flex, FlexParameters } from '@uniformdev/csk-components/components/canvas';
import createComponentResolver from '@uniformdev/csk-components/utils/createComponentResolver';
import { ContainerArgTypes } from '@/argTypes';
import { IMAGE_ASSET } from '@/assets';
import { createFakeCompositionData, createUniformParameter, fakeContext } from '@/utils';
import { ArgTypes, Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Flex> = {
  title: 'Component Starter Kit/Components/Flex',
  component: Flex,
};

export default meta;
type Story = StoryObj<typeof Flex>;

const { displayName: _, ...baseContainerArgTypes } = ContainerArgTypes;

const argTypes: Partial<ArgTypes<FlexParameters>> = {
  displayName: { control: 'text' },
  direction: {
    control: 'select',
    options: ['row', 'row-reverse', 'col', 'col-reverse'],
  },
  justifyContent: {
    control: 'select',
    options: ['start', 'end', 'center', 'between'],
  },
  alignItems: {
    control: 'select',
    options: ['start', 'end', 'center', 'stretch'],
  },
  wrap: {
    control: 'select',
    options: ['nowrap', 'wrap', 'wrap-reverse'],
  },
  gap: { control: 'select', options: ['2', '8', '16'] },
  ...baseContainerArgTypes,
};

export const Default: Story = {
  args: {
    displayName: 'Flex',
    direction: 'row',
    justifyContent: 'between',
    gap: '8',
    alignItems: 'center',
    backgroundColor: 'text-secondary',
    fluidContent: false,
    wrap: 'wrap',
  },
  argTypes,
  render: (args: FlexParameters) => {
    const route = createFakeCompositionData(
      'flex',
      undefined,
      {
        ...args,
      },
      {
        flexItem: Array.from({ length: 3 }, () => ({
          type: 'image',
          parameters: createUniformParameter({
            image: IMAGE_ASSET,
            objectFit: 'cover',
            width: 250,
            height: 250,
          }),
        })),
      }
    );
    return (
      <UniformComposition
        serverContext={fakeContext}
        params={Promise.resolve({})}
        searchParams={Promise.resolve({})}
        route={route}
        resolveComponent={createComponentResolver({
          image: { component: Image },
          flex: { component: Flex },
        })}
        mode="server"
      />
    );
  },
};

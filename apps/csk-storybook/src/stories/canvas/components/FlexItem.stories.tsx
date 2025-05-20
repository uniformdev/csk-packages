import { UniformComposition } from '@uniformdev/canvas-next-rsc';
import { Image, FlexItem, FlexItemParameters } from '@uniformdev/csk-components/components/canvas';
import { Flex } from '@uniformdev/csk-components/components/ui';
import createComponentResolver from '@uniformdev/csk-components/utils/createComponentResolver';
import { IMAGE_ASSET } from '@/assets';
import { createFakeCompositionData, createUniformParameter, fakeContext } from '@/utils';
import { ArgTypes, Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof FlexItem> = {
  title: 'Component Starter Kit/Components/FlexItem',
  component: FlexItem,
};

export default meta;
type Story = StoryObj<typeof FlexItem>;

const argTypes: Partial<ArgTypes<FlexItemParameters>> = {
  displayName: { control: 'text' },
  alignSelf: {
    control: 'select',
    options: ['auto', 'start', 'end', 'center', 'stretch'],
  },
  shrink: { control: 'select', options: ['0', '1'] },
};

export const Default: Story = {
  args: {
    displayName: 'Flex Item',
    alignSelf: 'auto',
    shrink: '1',
  },
  argTypes,
  render: (args: FlexItemParameters) => {
    const route = createFakeCompositionData(
      'flexItem',
      undefined,
      {
        ...args,
      },
      {
        inner: [
          {
            type: 'image',
            parameters: createUniformParameter({
              image: IMAGE_ASSET,
              objectFit: 'cover',
              width: 250,
              height: 250,
            }),
          },
        ],
      }
    );
    return (
      <Flex gap="4">
        <UniformComposition
          serverContext={fakeContext}
          params={Promise.resolve({})}
          searchParams={Promise.resolve({})}
          route={route}
          resolveComponent={createComponentResolver({
            flexItem: { component: FlexItem },
            image: { component: Image },
          })}
          mode="server"
        />
        <div className="h-[400px] w-full bg-blue-400" />
      </Flex>
    );
  },
};

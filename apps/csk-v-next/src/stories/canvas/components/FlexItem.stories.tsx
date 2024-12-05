import { UniformComposition } from '@uniformdev/canvas-next-rsc';
import { Image } from '@/components/canvas';
import FlexItem, { FlexItemParameters } from '@/components/canvas/FlexItem';
import Flex from '@/components/ui/Flex';
import { IMAGE_ASSET } from '@/stories/assets';
import { createFakeCompositionData, createUniformParameter, fakeContext } from '@/stories/utils';
import createComponentResolver from '@/utils/createComponentResolver';
import { ArgTypes, Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof FlexItem> = {
  title: 'Component Starter Kit/Components/FlexItem',
  component: FlexItem,
};

export default meta;
type Story = StoryObj<typeof FlexItem>;

const argTypes: Partial<ArgTypes<FlexItemParameters>> = {
  displayName: { control: 'text' },
  alignSelf: { control: 'select', options: ['auto', 'start', 'end', 'center', 'stretch'] },
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
          params={{}}
          searchParams={{}}
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

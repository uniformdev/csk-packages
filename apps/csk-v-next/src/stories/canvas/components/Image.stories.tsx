import { UniformComposition } from '@uniformdev/canvas-next-rsc';
import Image from '@/components/canvas/Image';
import { ImageArgTypes } from '@/stories/argTypes';
import { IMAGE_ASSET } from '@/stories/assets';
import { createFakeCompositionData, fakeContext } from '@/stories/utils';
import createComponentResolver from '@/utils/createComponentResolver';
import { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Image> = {
  title: 'Component Starter Kit/Components/Image',
  component: Image,
};

export default meta;
type Story = StoryObj<typeof Image>;

export const Default: Story = {
  args: {
    objectFit: 'cover',
    width: 500,
    height: 500,
  },
  argTypes: ImageArgTypes,
  render: args => {
    const route = createFakeCompositionData('image', undefined, {
      ...args,
      image: IMAGE_ASSET,
    });
    return (
      <UniformComposition
        serverContext={fakeContext}
        params={{}}
        searchParams={{}}
        route={route}
        resolveComponent={createComponentResolver({
          image: { component: Image },
        })}
        mode="server"
      />
    );
  },
};

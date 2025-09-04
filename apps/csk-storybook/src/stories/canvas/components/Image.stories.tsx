import { UniformComposition } from '@uniformdev/canvas-next-rsc-v2';
import { Image } from '@uniformdev/csk-components/components/canvas/serverClient';
import createComponentResolver from '@uniformdev/csk-components/utils/createComponentResolver';
import { ImageArgTypes } from '@/argTypes';
import { IMAGE_ASSET } from '@/assets';
import { createFakeCompositionData } from '@/utils';
import { Meta, StoryObj } from '@storybook/nextjs';

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
        {...route}
        resolveComponent={createComponentResolver({
          image: Image,
        })}
      />
    );
  },
};

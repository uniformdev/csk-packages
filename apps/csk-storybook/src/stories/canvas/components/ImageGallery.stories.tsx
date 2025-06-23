import { UniformComposition } from '@uniformdev/canvas-next-rsc';
import { Image, ImageGallery, ImageGalleryParameters } from '@uniformdev/csk-components/components/canvas';
import createComponentResolver from '@uniformdev/csk-components/utils/createComponentResolver';
import { ContainerArgTypes } from '@/argTypes';
import { IMAGE_ASSET } from '@/assets';
import { createFakeCompositionData, createUniformParameter, fakeContext } from '@/utils';
import { ArgTypes, Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof ImageGallery> = {
  title: 'Component Starter Kit/Components/Image Gallery',
  component: ImageGallery,
};

export default meta;
type Story = StoryObj<typeof ImageGallery>;

const { displayName: _, ...baseContainerArgTypes } = ContainerArgTypes;

const argTypes: Partial<ArgTypes<ImageGalleryParameters>> = {
  displayName: { control: 'text' },
  aspectRatio: { control: 'select', options: ['square', 'video'] },
  ...baseContainerArgTypes,
};

export const Default: Story = {
  args: {
    displayName: 'Image Gallery',
    aspectRatio: 'square',
    backgroundColor: 'text-secondary',
    fluidContent: true,
  },
  argTypes,
  render: (args: ImageGalleryParameters) => {
    const route = createFakeCompositionData('imageGallery', undefined, args, {
      imageGalleryItems: Array.from({ length: 5 }, () => ({
        type: 'image',
        parameters: createUniformParameter({
          image: IMAGE_ASSET,
          objectFit: 'cover',
        }),
      })),
    });
    return (
      <UniformComposition
        serverContext={fakeContext}
        params={Promise.resolve({})}
        searchParams={Promise.resolve({})}
        route={route}
        resolveComponent={createComponentResolver({
          imageGallery: { component: ImageGallery },
          image: { component: Image },
        })}
        mode="server"
      />
    );
  },
};

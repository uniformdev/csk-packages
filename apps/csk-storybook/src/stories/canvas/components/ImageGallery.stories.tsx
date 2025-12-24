import { Image, ImageGallery, ImageGalleryParameters } from '@uniformdev/csk-components/components/canvas/serverClient';
import createComponentResolver from '@uniformdev/csk-components/utils/createComponentResolver';
import { UniformComposition } from '@uniformdev/next-app-router';
import { ContainerArgTypes } from '@/argTypes';
import { IMAGE_ASSET } from '@/assets';
import { createFakeCompositionData, createUniformParameter } from '@/utils';
import { ArgTypes, Meta, StoryObj } from '@storybook/nextjs';

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
  render: args => {
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
        {...route}
        resolveComponent={createComponentResolver({
          imageGallery: ImageGallery,
          image: Image,
        })}
      />
    );
  },
};

import { UniformComposition } from '@uniformdev/canvas-next-rsc';
import { Image } from '@/components/canvas';
import Carousel, { CarouselParameters } from '@/components/canvas/Carousel';
import { ContainerArgTypes } from '@/stories/argTypes';
import { IMAGE_ASSET } from '@/stories/assets';
import { createFakeCompositionData, createUniformParameter, fakeContext } from '@/stories/utils';
import createComponentResolver from '@/utils/createComponentResolver';
import { ArgTypes, Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Carousel> = {
  title: 'Component Starter Kit/Components/Carousel',
  component: Carousel,
};

export default meta;
type Story = StoryObj<typeof Carousel>;

const { displayName: _, ...baseContainerArgTypes } = ContainerArgTypes;

const argTypes: Partial<ArgTypes<CarouselParameters>> = {
  displayName: { control: 'text' },
  ...baseContainerArgTypes,
};

export const Default: Story = {
  args: {
    displayName: 'Carousel',
    backgroundColor: 'text-secondary',
    fluidContent: true,
    fullHeight: false,
  },
  argTypes,
  render: (args: CarouselParameters) => {
    const route = createFakeCompositionData(
      'carousel',
      undefined,
      {
        ...args,
      },
      {
        carouselItems: Array.from({ length: 6 }, () => ({
          type: 'image',
          parameters: createUniformParameter({
            image: IMAGE_ASSET,
            objectFit: 'cover',
            height: 500,
            width: 500,
          }),
        })),
      }
    );
    return (
      <UniformComposition
        serverContext={fakeContext}
        params={{}}
        searchParams={{}}
        route={route}
        resolveComponent={createComponentResolver({
          carousel: { component: Carousel },
          image: { component: Image },
        })}
        mode="server"
      />
    );
  },
};

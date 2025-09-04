import { ReactElement } from 'react';
import { UniformComposition } from '@uniformdev/canvas-next-rsc-v2';
import { Image, Carousel, CarouselParameters } from '@uniformdev/csk-components/components/canvas/serverClient';
import createComponentResolver from '@uniformdev/csk-components/utils/createComponentResolver';
import { ContainerArgTypes } from '@/argTypes';
import { IMAGE_ASSET } from '@/assets';
import { createFakeCompositionData, createUniformParameter } from '@/utils';
import { ArgTypes, Meta, StoryObj } from '@storybook/nextjs';

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

const createCarouselItems = (count = 16) =>
  Array.from({ length: count }, () => ({
    type: 'image',
    parameters: createUniformParameter({
      image: IMAGE_ASSET,
      objectFit: 'cover',
      height: 500,
      width: 500,
    }),
  }));

const createStory = (variant?: string): ((args: CarouselParameters) => ReactElement) => {
  return (args: CarouselParameters) => {
    const route = createFakeCompositionData('carousel', variant, { ...args }, { carouselItems: createCarouselItems() });

    return (
      <UniformComposition
        {...route}
        resolveComponent={createComponentResolver({
          carousel: Carousel,
          image: Image,
        })}
      />
    );
  };
};

export const Default: Story = {
  args: {
    displayName: 'Carousel',
    backgroundColor: 'text-secondary',
    fluidContent: true,
    itemsPerPage: '1',
  },
  argTypes,
  render: createStory(),
};

export const DefaultWithMultipleItems: Story = {
  args: {
    displayName: 'Carousel',
    backgroundColor: 'text-secondary',
    fluidContent: true,
    itemsPerPage: '3',
    gapX: '4',
  },
  argTypes,
  render: createStory(),
};

export const BrochureWithMultipleItems: Story = {
  args: {
    displayName: 'Carousel',
    backgroundColor: 'text-secondary',
    fluidContent: true,
    itemsPerPage: '3',
    gapX: '4',
  },
  argTypes,
  render: createStory('brochure'),
};

export const NumericWithMultipleItems: Story = {
  args: {
    displayName: 'Carousel',
    backgroundColor: 'text-secondary',
    fluidContent: true,
    itemsPerPage: '3',
    gapX: '4',
  },
  argTypes,
  render: createStory('numeric'),
};

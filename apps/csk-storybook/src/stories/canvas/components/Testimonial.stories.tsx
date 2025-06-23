import { UniformComposition } from '@uniformdev/canvas-next-rsc';
import {
  Text,
  Button,
  Image,
  Testimonial,
  TestimonialParameters,
  TestimonialVariants,
} from '@uniformdev/csk-components/components/canvas';
import createComponentResolver from '@uniformdev/csk-components/utils/createComponentResolver';
import { ContainerArgTypes } from '@/argTypes';
import { getTestimonialDefaultContent } from '@/canvasMock/components/testimonial';
import { createFakeCompositionData, fakeContext } from '@/utils';
import { ArgTypes, Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Testimonial> = {
  title: 'Component Starter Kit/Components/Testimonial',
  component: Testimonial,
};

export default meta;
type Story = StoryObj<typeof Testimonial>;

const { displayName: _, ...baseContainerArgTypes } = ContainerArgTypes;

const argTypes: Partial<ArgTypes<TestimonialParameters>> = {
  displayName: { control: 'text' },
  ...baseContainerArgTypes,
};

const renderStory = (variant?: TestimonialVariants) => (args: TestimonialParameters) => {
  const route = createFakeCompositionData(
    'testimonial',
    variant,
    {
      ...args,
    },
    getTestimonialDefaultContent(variant)
  );
  return (
    <UniformComposition
      serverContext={fakeContext}
      params={Promise.resolve({})}
      searchParams={Promise.resolve({})}
      route={route}
      resolveComponent={createComponentResolver({
        testimonial: { component: Testimonial },
        text: { component: Text },
        button: { component: Button },
        image: { component: Image },
      })}
      mode="server"
    />
  );
};

export const Default: Story = {
  args: {
    displayName: 'Default',
    spacing: {
      paddingTop: 'container-large',
      paddingBottom: 'container-large',
    },
  },
  argTypes,
  render: renderStory(),
};

export const WithLargeAvatar: Story = {
  args: {
    displayName: 'Default',
    spacing: {
      paddingTop: 'container-large',
      paddingBottom: 'container-large',
    },
  },
  argTypes,
  render: renderStory(TestimonialVariants.WithLargeAvatar),
};

export const WithOverlappingImage: Story = {
  args: {
    displayName: 'Testimonial',
    spacing: {
      marginTop: 'container-large',
      marginBottom: 'container-large',
    },
    backgroundColor: 'general-color-2',
    fluidContent: true,
  },
  argTypes,
  render: renderStory(TestimonialVariants.WithOverlappingImage),
};

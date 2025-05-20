import { UniformComposition } from '@uniformdev/canvas-next-rsc';
import { Testimonial, Image, Text, TestimonialParameters } from '@uniformdev/csk-components/components/canvas';
import createComponentResolver from '@uniformdev/csk-components/utils/createComponentResolver';
import { testimonialContentCSK } from '@/canvasMock/patterns/testimonial';
import { createFakeCompositionData, fakeContext } from '@/utils';
import { ArgTypes, Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Testimonial> = {
  title: 'Component Starter Kit/Patterns/Testimonial',
  component: Testimonial,
};

export default meta;
type Story = StoryObj<typeof Testimonial>;

const argTypes: Partial<ArgTypes<TestimonialParameters>> = {
  displayName: { control: 'text' },
  fluidContent: { control: 'boolean' },
  backgroundColor: { control: 'text' },
};

const renderStory = () => (args: TestimonialParameters) => {
  const route = createFakeCompositionData(
    'testimonial',
    testimonialContentCSK.variant,
    {
      ...testimonialContentCSK.parameters,
      ...args,
    },
    testimonialContentCSK.slots
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
        image: { component: Image },
      })}
      mode="server"
    />
  );
};

export const OverlappingImage: Story = {
  args: {
    displayName: 'Testimonial - Overlapping Image',
    fluidContent: true,
    backgroundColor: 'general-color-5',
  },
  argTypes,
  render: renderStory(),
};

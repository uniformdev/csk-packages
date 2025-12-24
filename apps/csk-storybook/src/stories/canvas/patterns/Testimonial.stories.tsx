import {
  Testimonial,
  Image,
  Text,
  TestimonialParameters,
} from '@uniformdev/csk-components/components/canvas/serverClient';
import createComponentResolver from '@uniformdev/csk-components/utils/createComponentResolver';
import { UniformComposition } from '@uniformdev/next-app-router';
import { testimonialContentCSK } from '@/canvasMock/patterns/testimonial';
import { createFakeCompositionData } from '@/utils';
import { ArgTypes, Meta, StoryObj } from '@storybook/nextjs';

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
      {...route}
      resolveComponent={createComponentResolver({
        testimonial: Testimonial,
        text: Text,
        image: Image,
      })}
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

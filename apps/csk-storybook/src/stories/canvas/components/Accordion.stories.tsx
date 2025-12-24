import {
  Text,
  AccordionItem,
  Accordion,
  AccordionParameters,
} from '@uniformdev/csk-components/components/canvas/serverClient';
import createComponentResolver from '@uniformdev/csk-components/utils/createComponentResolver';
import { UniformComposition } from '@uniformdev/next-app-router';
import { ContainerArgTypes } from '@/argTypes';
import { accordionDefault } from '@/canvasMock/components/accordion';
import { createFakeCompositionData } from '@/utils';
import { ArgTypes, Meta, StoryObj } from '@storybook/nextjs';

const meta: Meta<typeof Accordion> = {
  title: 'Component Starter Kit/Components/Accordion',
  component: Accordion,
};

export default meta;
type Story = StoryObj<typeof Accordion>;

const argTypes: Partial<ArgTypes<AccordionParameters>> = {
  ...ContainerArgTypes,
};

export const Default: Story = {
  args: {
    displayName: 'Frequently Asked Questions',
  },
  argTypes,
  render: args => {
    const route = createFakeCompositionData(
      'accordion',
      undefined,
      {
        ...args,
      },
      accordionDefault
    );

    return (
      <UniformComposition
        {...route}
        resolveComponent={createComponentResolver({
          accordion: Accordion,
          accordionItem: AccordionItem,
          text: Text,
        })}
      />
    );
  },
};

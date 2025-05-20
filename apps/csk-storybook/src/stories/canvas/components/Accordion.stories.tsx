import { UniformComposition } from '@uniformdev/canvas-next-rsc';
import { Text, AccordionItem, Accordion, AccordionParameters } from '@uniformdev/csk-components/components/canvas';
import createComponentResolver from '@uniformdev/csk-components/utils/createComponentResolver';
import { ContainerArgTypes } from '@/argTypes';
import { accordionDefault } from '@/canvasMock/components/accordion';
import { createFakeCompositionData, fakeContext } from '@/utils';
import { ArgTypes, Meta, StoryObj } from '@storybook/react';

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
        serverContext={fakeContext}
        params={Promise.resolve({})}
        searchParams={Promise.resolve({})}
        route={route}
        resolveComponent={createComponentResolver({
          accordion: { component: Accordion },
          accordionItem: { component: AccordionItem },
          text: { component: Text },
        })}
        mode="server"
      />
    );
  },
};

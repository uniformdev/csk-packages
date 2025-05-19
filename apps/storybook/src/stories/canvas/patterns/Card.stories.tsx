import { UniformComposition } from '@uniformdev/canvas-next-rsc';
import { Card, RichText, Button, CardParameters } from '@uniformdev/csk-components/components/canvas';
import createComponentResolver from '@uniformdev/csk-components/utils/createComponentResolver';
import { cardContentCSK } from '@/canvasMock/patterns/card';
import { createFakeCompositionData, fakeContext } from '@/utils';
import { ArgTypes, Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Card> = {
  title: 'Component Starter Kit/Patterns/Card',
  component: Card,
};

export default meta;
type Story = StoryObj<typeof Card>;

const argTypes: Partial<ArgTypes<CardParameters>> = {
  displayName: { control: 'text' },
  backgroundColor: { control: 'text' },
  fluidContent: { control: 'boolean' },
};

const renderStory = () => (args: CardParameters) => {
  const route = createFakeCompositionData(
    'card',
    undefined,
    {
      ...cardContentCSK.parameters,
      ...args,
    },
    cardContentCSK.slots
  );

  return (
    <UniformComposition
      serverContext={fakeContext}
      params={Promise.resolve({})}
      searchParams={Promise.resolve({})}
      route={route}
      resolveComponent={createComponentResolver({
        card: { component: Card },
        richText: { component: RichText },
        button: { component: Button },
      })}
      mode="server"
    />
  );
};

export const Default: Story = {
  args: {
    displayName: 'Card Default',
    backgroundColor: 'general-color-1',
    fluidContent: true,
  },
  argTypes,
  render: renderStory(),
};

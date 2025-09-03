import { UniformComposition } from '@uniformdev/canvas-next-rsc-v2';
import { Card, RichText, Button, CardParameters } from '@uniformdev/csk-components/components/canvas/serverClient';
import createComponentResolver from '@uniformdev/csk-components/utils/createComponentResolver';
import { cardContentCSK } from '@/canvasMock/patterns/card';
import { createFakeCompositionData } from '@/utils';
import { ArgTypes, Meta, StoryObj } from '@storybook/nextjs';

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
      {...route}
      resolveComponent={createComponentResolver({
        card: Card,
        richText: RichText,
        button: Button,
      })}
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

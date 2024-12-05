import { UniformComposition } from '@uniformdev/canvas-next-rsc';
import { Text, Button, Image, RichText } from '@/components/canvas';
import Card, { CardParameters, CardProps, CardVariant } from '@/components/canvas/Card';
import { ContainerArgTypes } from '@/stories/argTypes';
import { createFakeCompositionData, createUniformParameter, fakeContext } from '@/stories/utils';
import createComponentResolver from '@/utils/createComponentResolver';
import { ArgTypes, Meta, StoryObj } from '@storybook/react';
import utilities from '../../../../tailwind.utilities.json';
import { cardDefault, cardWithBackgroundImage } from '../../canvasMock/components/card';

const borderKeys = Object.keys(utilities || {}).map(key => key.substring(1));

const meta: Meta<typeof Card> = {
  title: 'Component Starter Kit/Components/Card',
  component: Card,
};
export default meta;

type Story = StoryObj<typeof Card>;
const { displayName: _title, ...baseContainerArgTypes } = ContainerArgTypes;

const argTypes: Partial<ArgTypes<CardParameters>> = {
  ...baseContainerArgTypes,
};

type Component = {
  type: string;
  parameters: ReturnType<typeof createUniformParameter>;
};

const createStory = ({
  variant,
  args,
  content,
}: {
  variant?: CardVariant;
  args: Partial<CardProps>;
  content: Record<string, Component[]>;
}): Story => ({
  args,
  argTypes,
  render: (renderArgs: CardProps) => {
    const route = createFakeCompositionData('card', variant, { ...renderArgs }, content);

    return (
      <UniformComposition
        serverContext={fakeContext}
        params={{}}
        searchParams={{}}
        route={route}
        resolveComponent={createComponentResolver({
          card: { component: Card },
          image: { component: Image },
          text: { component: Text },
          button: { component: Button },
          richText: { component: RichText },
        })}
        mode="server"
      />
    );
  },
});

export const Default: Story = createStory({
  args: {
    spacing: {
      paddingTop: 'container-large',
      paddingBottom: 'container-large',
      paddingLeft: 'container-medium',
      paddingRight: 'container-medium',
    },
    border: borderKeys[0],
    backgroundColor: 'text-secondary',
    fluidContent: true,
    fullHeight: false,
  },
  content: cardDefault,
});

export const BackgroundImage: Story = createStory({
  variant: CardVariant.BackgroundImage,
  args: {
    spacing: {
      paddingTop: 'container-small',
      paddingBottom: 'container-small',
      paddingLeft: 'container-small',
    },
    border: borderKeys[0],
    fluidContent: true,
    fullHeight: false,
  },
  content: cardWithBackgroundImage,
});

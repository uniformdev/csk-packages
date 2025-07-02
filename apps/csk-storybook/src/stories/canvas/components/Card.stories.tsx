import { UniformComposition } from '@uniformdev/canvas-next-rsc';
import {
  Text,
  Button,
  Image,
  RichText,
  Card,
  CardParameters,
  CardProps,
  CardVariants,
} from '@uniformdev/csk-components/components/canvas';
import createComponentResolver from '@uniformdev/csk-components/utils/createComponentResolver';
import { ContainerArgTypes } from '@/argTypes';
import { cardDefault, cardWithBackgroundImage } from '@/canvasMock/components/card';
import { createFakeCompositionData, createUniformParameter, fakeContext } from '@/utils';
import { ArgTypes, Meta, StoryObj } from '@storybook/react';
import theme from '../../../../themeData.json';

const borderKeys = theme.borders.map(border => border.borderKey);

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
  variant?: CardVariants;
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
        params={Promise.resolve({})}
        searchParams={Promise.resolve({})}
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
  },
  content: cardDefault,
});

export const BackgroundImage: Story = createStory({
  variant: CardVariants.BackgroundImage,
  args: {
    spacing: {
      paddingTop: 'container-small',
      paddingBottom: 'container-small',
      paddingLeft: 'container-small',
    },
    border: borderKeys[0],
    fluidContent: true,
  },
  content: cardWithBackgroundImage,
});

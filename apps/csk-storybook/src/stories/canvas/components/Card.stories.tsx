import {
  Text,
  Button,
  Image,
  RichText,
  Card,
  CardParameters,
  CardVariants,
} from '@uniformdev/csk-components/components/canvas/serverClient';
import createComponentResolver from '@uniformdev/csk-components/utils/createComponentResolver';
import { UniformComposition } from '@uniformdev/next-app-router';
import { ContainerArgTypes } from '@/argTypes';
import { cardDefault, cardWithBackgroundImage } from '@/canvasMock/components/card';
import { createFakeCompositionData, createUniformParameter } from '@/utils';
import { ArgTypes, Meta, StoryObj } from '@storybook/nextjs';
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
  args: Partial<CardParameters>;
  content: Record<string, Component[]>;
}): Story => ({
  args,
  argTypes,
  render: renderArgs => {
    const route = createFakeCompositionData('card', variant, { ...renderArgs }, content);

    return (
      <UniformComposition
        {...route}
        resolveComponent={createComponentResolver({
          card: Card,
          image: Image,
          text: Text,
          button: Button,
          richText: RichText,
        })}
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

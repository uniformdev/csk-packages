import {
  Text,
  Image,
  Review,
  ReviewParameters,
  ReviewVariants,
} from '@uniformdev/csk-components/components/canvas/serverClient';
import createComponentResolver from '@uniformdev/csk-components/utils/createComponentResolver';
import { UniformComposition } from '@uniformdev/next-app-router';
import { ContainerArgTypes } from '@/argTypes';
import { reviewsDefault } from '@/canvasMock/components/reviews';
import { createFakeCompositionData } from '@/utils';
import { ArgTypes, Meta, StoryObj } from '@storybook/nextjs';
import theme from '../../../../themeData.json';

const meta: Meta<typeof Review> = {
  title: 'Component Starter Kit/Components/Review',
  component: Review,
};

export default meta;
type Story = StoryObj<typeof Review>;

const { displayName: _, ...baseContainerArgTypes } = ContainerArgTypes;

const colorKeys = theme.colors.map(color => color.colorKey);

const argTypes: Partial<ArgTypes<ReviewParameters>> = {
  displayName: { control: 'text' },
  stars: { control: 'number' },
  starsColor: { control: 'select', options: colorKeys },
  activeStarsColor: { control: 'select', options: colorKeys },
  showRatingLabel: { control: 'boolean' },
  ...baseContainerArgTypes,
};

const renderStory = (variant?: ReviewVariants) => (args: ReviewParameters) => {
  const route = createFakeCompositionData(
    'review',
    variant,
    {
      ...args,
    },
    reviewsDefault
  );
  return (
    <UniformComposition
      {...route}
      resolveComponent={createComponentResolver({
        review: Review,
        text: Text,
        image: Image,
      })}
    />
  );
};

export const Default: Story = {
  args: {
    displayName: 'Default',
    stars: 3,
    starsColor: 'button-tertiary',
    activeStarsColor: 'button-primary',
    showRatingLabel: true,
    spacing: {
      paddingTop: 'container-large',
      paddingBottom: 'container-large',
    },
  },
  argTypes,
  render: renderStory(),
};

export const MultiColumn: Story = {
  args: {
    displayName: 'Default',
    stars: 3,
    starsColor: 'button-tertiary',
    activeStarsColor: 'button-primary',
    showRatingLabel: true,
    spacing: {
      paddingTop: 'container-large',
      paddingBottom: 'container-large',
    },
  },
  argTypes,
  render: renderStory(ReviewVariants.MultiColumn),
};

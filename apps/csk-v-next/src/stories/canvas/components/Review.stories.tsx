import { UniformComposition } from '@uniformdev/canvas-next-rsc';
import { Text, Image } from '@/components/canvas';
import Review, { ReviewParameters, ReviewVariants } from '@/components/canvas/Review';
import { ContainerArgTypes } from '@/stories/argTypes';
import { createFakeCompositionData, fakeContext } from '@/stories/utils';
import createComponentResolver from '@/utils/createComponentResolver';
import { ArgTypes, Meta, StoryObj } from '@storybook/react';
import theme from '../../../../tailwind.config.theme.json';
import { reviewsDefault } from '../../canvasMock/components/reviews';

const meta: Meta<typeof Review> = {
  title: 'Component Starter Kit/Components/Review',
  component: Review,
};

export default meta;
type Story = StoryObj<typeof Review>;

const { displayName: _, ...baseContainerArgTypes } = ContainerArgTypes;

const colorKeys = Object.keys(theme.extend.colors || {});

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
      serverContext={fakeContext}
      params={{}}
      searchParams={{}}
      route={route}
      resolveComponent={createComponentResolver({
        review: { component: Review },
        text: { component: Text },
        image: { component: Image },
      })}
      mode="server"
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

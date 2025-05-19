import { UniformComposition } from '@uniformdev/canvas-next-rsc';
import { Image, Text, Grid, GridParameters, Review } from '@uniformdev/csk-components/components/canvas';
import createComponentResolver from '@uniformdev/csk-components/utils/createComponentResolver';
import { reviewContentCSK } from '@/canvasMock/patterns/review';
import { createFakeCompositionData, fakeContext } from '@/utils';
import { ArgTypes, Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Grid> = {
  title: 'Component Starter Kit/Patterns/Review',
  component: Grid,
};

export default meta;
type Story = StoryObj<typeof Grid>;

const argTypes: Partial<ArgTypes<GridParameters>> = {
  displayName: { control: 'text' },
};

const renderStory = (content: typeof reviewContentCSK) => (args: GridParameters) => {
  const route = createFakeCompositionData(
    'review',
    content.type,
    {
      ...args,
      ...content.parameters,
    },
    content.slots
  );

  return (
    <UniformComposition
      serverContext={fakeContext}
      params={Promise.resolve({})}
      searchParams={Promise.resolve({})}
      route={route}
      resolveComponent={createComponentResolver({
        image: { component: Image },
        text: { component: Text },
        review: { component: Review },
      })}
      mode="server"
    />
  );
};

export const Default: Story = {
  args: {
    displayName: 'Simple Review',
  },
  argTypes,
  render: renderStory(reviewContentCSK),
};

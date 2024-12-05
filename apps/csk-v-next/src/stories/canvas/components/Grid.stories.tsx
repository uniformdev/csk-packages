import { UniformComposition } from '@uniformdev/canvas-next-rsc';
import { Image } from '@/components/canvas';
import Grid, { GridParameters } from '@/components/canvas/Grid';
import { ContainerArgTypes } from '@/stories/argTypes';
import { IMAGE_ASSET } from '@/stories/assets';
import { createFakeCompositionData, createUniformParameter, fakeContext } from '@/stories/utils';
import createComponentResolver from '@/utils/createComponentResolver';
import { ArgTypes, Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Grid> = {
  title: 'Component Starter Kit/Components/Grid',
  component: Grid,
};

export default meta;
type Story = StoryObj<typeof Grid>;

const { displayName: _, ...baseContainerArgTypes } = ContainerArgTypes;

const argTypes: Partial<ArgTypes<GridParameters>> = {
  displayName: { control: 'text' },
  columnsCount: { control: 'select', options: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'] },
  gapX: { control: 'select', options: ['2', '8', '16'] },
  gapY: { control: 'select', options: ['2', '8', '16'] },
  ...baseContainerArgTypes,
};

export const Default: Story = {
  args: {
    displayName: 'Grid',
    columnsCount: '3',
    gapX: '8',
    gapY: '8',
    backgroundColor: 'text-secondary',
    fluidContent: false,
    fullHeight: false,
  },
  argTypes,
  render: (args: GridParameters) => {
    const route = createFakeCompositionData(
      'grid',
      undefined,
      {
        ...args,
      },
      {
        gridInner: Array.from({ length: 6 }, () => ({
          type: 'image',
          parameters: createUniformParameter({
            image: IMAGE_ASSET,
            objectFit: 'cover',
            height: 250,
          }),
        })),
      }
    );
    return (
      <UniformComposition
        serverContext={fakeContext}
        params={{}}
        searchParams={{}}
        route={route}
        resolveComponent={createComponentResolver({
          image: { component: Image },
          grid: { component: Grid },
        })}
        mode="server"
      />
    );
  },
};

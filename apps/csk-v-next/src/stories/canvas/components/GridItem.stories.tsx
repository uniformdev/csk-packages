import { UniformComposition } from '@uniformdev/canvas-next-rsc';
import { Image } from '@/components/canvas';
import GridItem, { GridItemParameters } from '@/components/canvas/GridItem';
import Grid from '@/components/ui/Grid';
import { IMAGE_ASSET } from '@/stories/assets';
import { createFakeCompositionData, createUniformParameter, fakeContext } from '@/stories/utils';
import createComponentResolver from '@/utils/createComponentResolver';
import { ArgTypes, Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof GridItem> = {
  title: 'Component Starter Kit/Components/GridItem',
  component: GridItem,
};

export default meta;
type Story = StoryObj<typeof GridItem>;

const SpanOptions = [
  'auto',
  'span-1',
  'span-2',
  'span-3',
  'span-4',
  'span-5',
  'span-6',
  'span-7',
  'span-8',
  'span-9',
  'span-10',
  'span-11',
  'span-12',
  'span-full',
];

const argTypes: Partial<ArgTypes<GridItemParameters>> = {
  displayName: { control: 'text' },
  columnStart: { control: 'select', options: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'] },
  columnSpan: { control: 'select', options: SpanOptions },
  rowStart: { control: 'select', options: ['1', '2', '3', '4', '5', '6'] },
  rowSpan: { control: 'select', options: SpanOptions },
};

export const Default: Story = {
  args: {
    displayName: 'Grid Item',
    columnStart: '1',
    columnSpan: 'span-1',
  },
  argTypes,
  render: (args: GridItemParameters) => {
    const route = createFakeCompositionData(
      'gridItem',
      undefined,
      {
        ...args,
      },
      {
        inner: [
          {
            type: 'image',
            parameters: createUniformParameter({
              image: IMAGE_ASSET,
              objectFit: 'cover',
              height: 250,
            }),
          },
        ],
      }
    );
    return (
      <Grid columnsCount="12">
        <UniformComposition
          serverContext={fakeContext}
          params={{}}
          searchParams={{}}
          route={route}
          resolveComponent={createComponentResolver({
            gridItem: { component: GridItem },
            image: { component: Image },
          })}
          mode="server"
        />
      </Grid>
    );
  },
};

import { UniformComposition } from '@uniformdev/canvas-next-rsc';
import { Image, GridItem, GridItemParameters } from '@uniformdev/csk-components/components/canvas';
import { Grid } from '@uniformdev/csk-components/components/ui';
import createComponentResolver from '@uniformdev/csk-components/utils/createComponentResolver';
import { IMAGE_ASSET } from '@/assets';
import { createFakeCompositionData, createUniformParameter, fakeContext } from '@/utils';
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
  columnStart: {
    control: 'select',
    options: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
  },
  columnSpan: { control: 'select', options: SpanOptions },
  rowStart: { control: 'select', options: ['1', '2', '3', '4', '5', '6'] },
  rowSpan: { control: 'select', options: SpanOptions },
  alignSelf: {
    control: 'select',
    options: ['start', 'end', 'center', 'baseline', 'stretch'],
  },
};

export const Default: Story = {
  args: {
    displayName: 'Grid Item',
    columnStart: '1',
    columnSpan: 'span-1',
    alignSelf: 'start',
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
          params={Promise.resolve({})}
          searchParams={Promise.resolve({})}
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

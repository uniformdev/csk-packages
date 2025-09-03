import { UniformComposition } from '@uniformdev/canvas-next-rsc-v2';
import { Image, Grid, GridParameters } from '@uniformdev/csk-components/components/canvas/serverClient';
import createComponentResolver from '@uniformdev/csk-components/utils/createComponentResolver';
import { ContainerArgTypes } from '@/argTypes';
import { IMAGE_ASSET } from '@/assets';
import { createFakeCompositionData, createUniformParameter } from '@/utils';
import { ArgTypes, Meta, StoryObj } from '@storybook/nextjs';

const meta: Meta<typeof Grid> = {
  title: 'Component Starter Kit/Components/Grid',
  component: Grid,
};

export default meta;
type Story = StoryObj<typeof Grid>;

const { displayName: _, ...baseContainerArgTypes } = ContainerArgTypes;

const argTypes: Partial<ArgTypes<GridParameters>> = {
  displayName: { control: 'text' },
  columnsCount: {
    control: 'select',
    options: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
  },
  gapX: { control: 'select', options: ['2', '8', '16'] },
  gapY: { control: 'select', options: ['2', '8', '16'] },
  alignItems: {
    control: 'select',
    options: ['start', 'end', 'center', 'baseline', 'stretch'],
  },
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
    alignItems: 'start',
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
        {...route}
        resolveComponent={createComponentResolver({
          image: Image,
          grid: Grid,
        })}
      />
    );
  },
};

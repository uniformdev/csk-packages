import { UniformComposition } from '@uniformdev/canvas-next-rsc-v2';
import {
  Badge,
  Button,
  TableCustomCell,
  TableDataCell,
  TableHeaderCell,
  TableRow,
  Text,
  Table,
  TableParameters,
} from '@uniformdev/csk-components/components/canvas/serverClient';
import createComponentResolver, { ComponentMapping } from '@uniformdev/csk-components/utils/createComponentResolver';
import { ContainerArgTypes } from '@/argTypes';
import { tableDefault, tableWithCustomCells } from '@/canvasMock/components/table';
import { createFakeCompositionData } from '@/utils';
import { ArgTypes, Meta, StoryObj } from '@storybook/nextjs';
import theme from '../../../../themeData.json';

const meta: Meta<typeof Table> = {
  title: 'Component Starter Kit/Components/Table',
  component: Table,
};

const colorKeys = theme.colors.map(color => color.colorKey);
const sizeKeys = theme.dimensions.map(dimension => dimension.dimensionKey).filter(key => key.startsWith('table'));

const { displayName: _, ...baseContainerArgTypes } = ContainerArgTypes;

const argTypes: Partial<ArgTypes<TableParameters>> = {
  displayName: { control: 'text' },
  size: { control: 'select', options: sizeKeys },
  textColor: { control: 'select', options: colorKeys },
  ...baseContainerArgTypes,
};

export default meta;
type Story = StoryObj<typeof Table>;

const componentMapper: ComponentMapping = {
  table: Table,
  tableRow: TableRow,
  tableHeaderCell: TableHeaderCell,
  tableDataCell: TableDataCell,
  tableCustomCell: TableCustomCell,
  button: Button,
  text: Text,
  badge: Badge,
};

export const Default: Story = {
  args: {
    displayName: 'Table',
    textColor: 'text-primary',
    backgroundColor: 'text-secondary',
    fluidContent: false,
    size: sizeKeys[0],
  },
  argTypes,
  render: (args: TableParameters) => {
    const route = createFakeCompositionData(
      'table',
      undefined,
      {
        ...args,
      },
      tableDefault
    );
    return <UniformComposition {...route} resolveComponent={createComponentResolver(componentMapper)} />;
  },
};

export const WithCustomCells: Story = {
  args: {
    displayName: 'Table',
    textColor: 'text-primary',
    backgroundColor: 'text-secondary',
    fluidContent: false,
  },
  argTypes,
  render: (args: TableParameters) => {
    const route = createFakeCompositionData(
      'table',
      undefined,
      {
        ...args,
      },
      tableWithCustomCells
    );
    return <UniformComposition {...route} resolveComponent={createComponentResolver(componentMapper)} />;
  },
};

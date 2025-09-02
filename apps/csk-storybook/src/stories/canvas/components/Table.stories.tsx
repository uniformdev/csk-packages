import { UniformComposition } from '@uniformdev/canvas-next-rsc';
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
} from '@uniformdev/csk-components/components/canvas';
import createComponentResolver, { ComponentMapping } from '@uniformdev/csk-components/utils/createComponentResolver';
import { ContainerArgTypes } from '@/argTypes';
import { tableDefault, tableWithCustomCells } from '@/canvasMock/components/table';
import { createFakeCompositionData, fakeContext } from '@/utils';
import { ArgTypes, Meta, StoryObj } from '@storybook/react';
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
  table: { component: Table },
  tableRow: { component: TableRow },
  tableHeaderCell: { component: TableHeaderCell },
  tableDataCell: { component: TableDataCell },
  tableCustomCell: { component: TableCustomCell },
  button: { component: Button },
  text: { component: Text },
  badge: { component: Badge },
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
    return (
      <UniformComposition
        serverContext={fakeContext}
        params={Promise.resolve({})}
        searchParams={Promise.resolve({})}
        route={route}
        resolveComponent={createComponentResolver(componentMapper)}
        mode="server"
      />
    );
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
    return (
      <UniformComposition
        serverContext={fakeContext}
        params={Promise.resolve({})}
        searchParams={Promise.resolve({})}
        route={route}
        resolveComponent={createComponentResolver(componentMapper)}
        mode="server"
      />
    );
  },
};

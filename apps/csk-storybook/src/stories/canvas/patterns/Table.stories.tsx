import { UniformComposition } from '@uniformdev/canvas-next-rsc';
import {
  Table,
  TableParameters,
  TableRow,
  TableHeaderCell,
  TableDataCell,
} from '@uniformdev/csk-components/components/canvas';
import createComponentResolver from '@uniformdev/csk-components/utils/createComponentResolver';
import { tableContentCSK } from '@/canvasMock/patterns/table';
import { createFakeCompositionData, fakeContext } from '@/utils';
import { ArgTypes, Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Table> = {
  title: 'Component Starter Kit/Patterns/Table',
  component: Table,
};

export default meta;
type Story = StoryObj<typeof Table>;

const argTypes: Partial<ArgTypes<TableParameters>> = {
  displayName: { control: 'text' },
  size: { control: 'text' },
};

const renderStory = () => (args: TableParameters) => {
  const route = createFakeCompositionData(
    'table',
    undefined,
    {
      ...tableContentCSK.parameters,
      ...args,
    },
    tableContentCSK.slots
  );

  return (
    <UniformComposition
      serverContext={fakeContext}
      params={Promise.resolve({})}
      searchParams={Promise.resolve({})}
      route={route}
      resolveComponent={createComponentResolver({
        table: { component: Table },
        tableRow: { component: TableRow },
        tableHeaderCell: { component: TableHeaderCell },
        tableDataCell: { component: TableDataCell },
      })}
      mode="server"
    />
  );
};

export const Default: Story = {
  args: {
    displayName: 'Table Default',
    size: 'table-small',
  },
  argTypes,
  render: renderStory(),
};

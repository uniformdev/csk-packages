import { UniformComposition } from '@uniformdev/canvas-next-rsc-v2';
import {
  Table,
  TableParameters,
  TableRow,
  TableHeaderCell,
  TableDataCell,
} from '@uniformdev/csk-components/components/canvas/serverClient';
import createComponentResolver from '@uniformdev/csk-components/utils/createComponentResolver';
import { tableContentCSK } from '@/canvasMock/patterns/table';
import { createFakeCompositionData } from '@/utils';
import { ArgTypes, Meta, StoryObj } from '@storybook/nextjs';

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
      {...route}
      resolveComponent={createComponentResolver({
        table: Table,
        tableRow: TableRow,
        tableHeaderCell: TableHeaderCell,
        tableDataCell: TableDataCell,
      })}
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

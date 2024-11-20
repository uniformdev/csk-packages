import { FC } from 'react';
import { ComponentProps, UniformSlot } from '@uniformdev/canvas-next-rsc/component';

type TableRowProps = ComponentProps;

const TableRow: FC<TableRowProps> = ({ slots, component, context }) => (
  <tr>
    <UniformSlot data={component} context={context} slot={slots.tableRowCells} />
  </tr>
);

export default TableRow;

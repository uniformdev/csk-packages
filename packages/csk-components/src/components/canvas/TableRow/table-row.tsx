import { FC } from 'react';
import { UniformSlot } from '@uniformdev/canvas-next-rsc/component';
import { TableRowProps } from '.';

export const TableRow: FC<TableRowProps> = ({ slots, component, context }) => (
  <tr>
    <UniformSlot data={component} context={context} slot={slots.tableRowCells} />
  </tr>
);

import { FC } from 'react';
import { ComponentProps, UniformText } from '@uniformdev/canvas-next-rsc/component';

export type TableDataCellParameters = { value?: string };

type TableDataCellProps = ComponentProps<TableDataCellParameters>;

const TableDataCell: FC<TableDataCellProps> = ({ component, context }) => (
  <td>
    <UniformText component={component} context={context} parameterId="value" placeholder="Value" />
  </td>
);

export default TableDataCell;

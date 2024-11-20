import { FC } from 'react';
import { ComponentProps, UniformText } from '@uniformdev/canvas-next-rsc/component';

export type TableHeaderCellParameters = { value?: string };

type TableHeaderCellProps = ComponentProps<TableHeaderCellParameters>;

const TableHeaderCell: FC<TableHeaderCellProps> = ({ component, context }) => (
  <th>
    <UniformText component={component} context={context} parameterId="value" placeholder="Value" />
  </th>
);

export default TableHeaderCell;

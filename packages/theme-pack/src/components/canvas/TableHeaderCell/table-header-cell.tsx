import { FC } from 'react';
import { UniformText } from '@uniformdev/canvas-next-rsc/component';
import { TableHeaderCellProps } from '.';

export const TableHeaderCell: FC<TableHeaderCellProps> = ({ component, context }) => (
  <th>
    <UniformText component={component} context={context} parameterId="value" placeholder="Value" />
  </th>
);

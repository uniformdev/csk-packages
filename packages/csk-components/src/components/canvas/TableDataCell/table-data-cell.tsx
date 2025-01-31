import { FC } from 'react';
import { UniformText } from '@uniformdev/canvas-next-rsc/component';
import { TableDataCellProps } from '.';

export const TableDataCell: FC<TableDataCellProps> = ({ component, context }) => (
  <td>
    <UniformText component={component} context={context} parameterId="value" placeholder="Value" />
  </td>
);

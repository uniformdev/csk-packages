import { FC } from 'react';
import { UniformSlot } from '@uniformdev/canvas-next-rsc-v2/component';
import { withFlattenParameters } from '@/utils/withFlattenParameters';
import { TableRowProps } from '.';

const TableRow: FC<TableRowProps> = ({ slots }) => (
  <tr>
    <UniformSlot slot={slots.tableRowCells} />
  </tr>
);

export default withFlattenParameters(TableRow);

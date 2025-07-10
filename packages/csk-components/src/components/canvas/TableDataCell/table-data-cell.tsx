import { FC } from 'react';
import { UniformText } from '@uniformdev/canvas-next-rsc-v2/component';
import { withFlattenParameters } from '@/utils/withFlattenParameters';
import { TableDataCellParameters, TableDataCellProps } from '.';

const TableDataCell: FC<TableDataCellProps & TableDataCellParameters> = ({ parameters, component }) => (
  <td>
    {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
    <UniformText component={component} parameter={parameters.value as any} placeholder="Value" />
  </td>
);

export default withFlattenParameters(TableDataCell);

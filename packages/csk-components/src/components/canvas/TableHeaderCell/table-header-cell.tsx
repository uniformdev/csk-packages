import { FC } from 'react';
import { UniformText } from '@uniformdev/canvas-next-rsc-v2/component';
import { withFlattenParameters } from '@/utils/withFlattenParameters';
import { TableHeaderCellParameters, TableHeaderCellProps } from '.';

const TableHeaderCell: FC<TableHeaderCellProps & TableHeaderCellParameters> = ({ parameters, component }) => (
  <th>
    {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
    <UniformText component={component} parameter={parameters.value as any} placeholder="Value" />
  </th>
);

export default withFlattenParameters(TableHeaderCell);

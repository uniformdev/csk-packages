import { FC } from 'react';
import { ComponentParameter, UniformText } from '@uniformdev/canvas-next-rsc-v2/component';
import { withFlattenParameters } from '@/utils/withFlattenParameters';
import { TableDataCellParameters, TableDataCellProps } from '.';

const TableDataCell: FC<TableDataCellProps & TableDataCellParameters> = ({ parameters, component }) => (
  <td>
    <UniformText component={component} parameter={parameters.value as ComponentParameter<string>} placeholder="Value" />
  </td>
);

export default withFlattenParameters(TableDataCell);

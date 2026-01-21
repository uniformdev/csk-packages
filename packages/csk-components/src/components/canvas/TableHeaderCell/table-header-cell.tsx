import { FC } from 'react';
import { ComponentParameter, UniformText } from '@uniformdev/next-app-router/component';
import { withFlattenParameters } from '@/utils/withFlattenParameters';
import { TableHeaderCellParameters, TableHeaderCellProps } from '.';

const TableHeaderCell: FC<TableHeaderCellProps & TableHeaderCellParameters> = ({ parameters, component }) => (
  <th>
    <UniformText component={component} parameter={parameters.value as ComponentParameter<string>} placeholder="Value" />
  </th>
);

export default withFlattenParameters(TableHeaderCell);

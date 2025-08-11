import { FC } from 'react';
import { UniformSlot } from '@uniformdev/canvas-next-rsc-v2/component';
import Container from '@/new-components/ui/Container';
import { withFlattenParameters } from '@/utils/withFlattenParameters';
import { TableParameters, TableProps } from '.';
import { getTableClasses } from './style-utils';

const Table: FC<TableProps & TableParameters> = ({
  size,
  textColor,
  slots,
  backgroundColor,
  spacing,
  border,
  fluidContent,
  height,
}) => (
  <Container className="flex flex-col gap-5" {...{ backgroundColor, spacing, border, fluidContent, height }}>
    <div className="overflow-x-auto">
      <table className={getTableClasses({ size, textColor })}>
        <thead>
          <UniformSlot slot={slots.tableHead} />
        </thead>
        <tbody>
          <UniformSlot slot={slots.tableBody} />
        </tbody>
      </table>
    </div>
  </Container>
);

export default withFlattenParameters(Table);

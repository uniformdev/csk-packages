import { FC } from 'react';
import { UniformSlot } from '@uniformdev/canvas-next-rsc-v2/component';
import { cn } from '@/utils/styling';
import { withFlattenParameters } from '@/utils/withFlattenParameters';
import { AlignmentMap, TableCustomCellParameters, TableCustomCellProps } from '.';

const TableCustomCell: FC<TableCustomCellProps & TableCustomCellParameters> = ({ slots, alignment }) => (
  <td>
    <div className={cn('w-fit', AlignmentMap[alignment || 'left'])}>
      <UniformSlot slot={slots.tableCustomCellContent} />
    </div>
  </td>
);

export default withFlattenParameters(TableCustomCell);

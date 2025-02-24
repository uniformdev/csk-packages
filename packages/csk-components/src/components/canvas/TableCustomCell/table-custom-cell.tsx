import { FC } from 'react';
import { UniformSlot } from '@uniformdev/canvas-next-rsc/component';
import { cn } from '@/utils/styling';
import { AlignmentMap, TableCustomCellProps } from '.';

export const TableCustomCell: FC<TableCustomCellProps> = ({ component, context, slots, alignment }) => (
  <td>
    <div className={cn('w-fit', AlignmentMap[alignment || 'left'])}>
      <UniformSlot slot={slots.tableCustomCellContent} context={context} data={component} />
    </div>
  </td>
);

import { FC } from 'react';
import { ComponentProps, UniformSlot } from '@uniformdev/canvas-next-rsc/component';
import { cn } from '@/utils';

const AlignmentMap = {
  left: 'ml-0',
  center: 'mx-auto',
  right: 'ml-auto',
};

export type TableCustomCellParameters = {
  alignment?: 'left' | 'center' | 'right';
};

enum TableCustomCellSlots {
  TableCustomCellContent = 'tableCustomCellContent',
}

type TableCustomCellProps = ComponentProps<TableCustomCellParameters, TableCustomCellSlots>;

const TableCustomCell: FC<TableCustomCellProps> = ({ component, context, slots, alignment }) => (
  <td>
    <div className={cn('w-fit', AlignmentMap[alignment || 'left'])}>
      <UniformSlot slot={slots.tableCustomCellContent} context={context} data={component} />
    </div>
  </td>
);

export default TableCustomCell;

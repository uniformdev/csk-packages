import { ComponentProps } from '@uniformdev/canvas-next-rsc/component';

export const AlignmentMap = {
  left: 'ml-0',
  center: 'mx-auto',
  right: 'ml-auto',
};

export type TableCustomCellParameters = {
  alignment?: 'left' | 'center' | 'right';
};

export enum TableCustomCellSlots {
  TableCustomCellContent = 'tableCustomCellContent',
}

export type TableCustomCellProps = ComponentProps<TableCustomCellParameters, TableCustomCellSlots>;

export { TableCustomCell as default } from './table-custom-cell';

import { ComponentProps } from '@/types/cskTypes';

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

export { default } from './table-custom-cell';

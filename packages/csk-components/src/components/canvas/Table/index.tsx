import { ContainerParameters } from '@/components/canvas/Container/parameters';
import { ComponentProps } from '@/types/cskTypes';

export type TableParameters = ContainerParameters & {
  size?: string;
  textColor?: string;
};

export enum TableSlots {
  TableHead = 'tableHead',
  TableBody = 'tableBody',
}

export type TableProps = ComponentProps<TableParameters, TableSlots>;

export { default } from './table';
export { TableEmptyPlaceholder } from './empty-placeholder';

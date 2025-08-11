import { ContainerParameters } from '@/new-components/canvas/Container';
import { ComponentProps } from '@/types/canvasTypes';

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

import { ComponentProps } from '@uniformdev/canvas-next-rsc/component';
import { ContainerParameters } from '@uniformdev/theme-pack/components/canvas';

export type TableParameters = ContainerParameters & {
  size?: string;
  textColor?: string;
};

export enum TableSlots {
  TableHead = 'tableHead',
  TableBody = 'tableBody',
}

export type TableProps = ComponentProps<TableParameters, TableSlots>;

export { Table as default } from './table';
export { TableEmptyPlaceholder } from './empty-placeholder';

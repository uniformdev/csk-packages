import { DataWithProperties } from '@uniformdev/canvas';
import { TextParameters } from '@/new-components/canvas/Text';
import { ComponentProps } from '@/types/canvasTypes';

export type BreadcrumbLink = {
  title: string;
  link?: string;
};

export type BreadcrumbsParameters = {
  title?: string;
  separator?: 'slash' | 'chevron';
  links?: DataWithProperties[];
  autoGenerate?: boolean;
} & Pick<TextParameters, 'size' | 'color' | 'font' | 'transform'>;

export type BreadcrumbsProps = ComponentProps<BreadcrumbsParameters>;

export { default } from './breadcrumbs';

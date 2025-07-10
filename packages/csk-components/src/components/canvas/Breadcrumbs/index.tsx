import { DataWithProperties } from '@uniformdev/canvas';
import { TextParameters } from '@/components/canvas/Text/parameters';
import { ComponentProps } from '@/types/cskTypes';

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

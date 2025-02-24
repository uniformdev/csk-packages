import { DataWithProperties } from '@uniformdev/canvas';
import { ComponentProps } from '@uniformdev/canvas-next-rsc/component';
import { TextParameters } from '@/components/canvas/Text/parameters';
import { withPlaygroundWrapper } from '@/hocs/withPlaygroundWrapper';
import { Breadcrumbs } from './breadcrumbs';

export type BreadcrumbLink = {
  title: string;
  link?: string;
};

export type BreadcrumbsParameters = {
  title?: string;
  separator?: 'slash' | 'chevron';
  links?: DataWithProperties[];
};

export type BreadcrumbsProps = ComponentProps<
  BreadcrumbsParameters & Pick<TextParameters, 'size' | 'color' | 'font' | 'transform'>
>;

export default withPlaygroundWrapper(Breadcrumbs);

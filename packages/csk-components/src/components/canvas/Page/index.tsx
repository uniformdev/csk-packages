import { UniformSlotProps } from '@uniformdev/next-app-router/component';
import { ComponentProps } from '@/types/cskTypes';
export type PageAdditionalProps = {
  headerCustomRenderer?: UniformSlotProps['children'];
  contentCustomRenderer?: UniformSlotProps['children'];
  footerCustomRenderer?: UniformSlotProps['children'];
};

export type PageParameters = {
  pageTitle?: string;
  backgroundColor?: string;
};

export enum CommonPageSlots {
  PageContent = 'pageContent',
  PageHeader = 'pageHeader',
  PageFooter = 'pageFooter',
}

export type PageProps = ComponentProps<PageParameters, CommonPageSlots> & PageAdditionalProps;

export { default } from './page';
export { PageEmptyPlaceholder } from './empty-placeholder';

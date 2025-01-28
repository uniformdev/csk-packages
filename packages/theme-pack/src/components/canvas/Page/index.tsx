import { ComponentProps, CustomSlotChildRenderFunc } from '@uniformdev/canvas-next-rsc/component';

export type PageAdditionalProps = {
  headerCustomRenderer?: CustomSlotChildRenderFunc;
  contentCustomRenderer?: CustomSlotChildRenderFunc;
  footerCustomRenderer?: CustomSlotChildRenderFunc;
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

export type PageProps = ComponentProps<PageParameters & PageAdditionalProps, CommonPageSlots>;

export { Page as default } from './page';
export { PageEmptyPlaceholder } from './empty-placeholder';

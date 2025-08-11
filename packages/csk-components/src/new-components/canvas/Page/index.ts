export type PageParameters = {
  pageTitle?: string;
  backgroundColor?: string;
};

export enum CommonPageSlots {
  PageContent = 'pageContent',
  PageHeader = 'pageHeader',
  PageFooter = 'pageFooter',
}

export { PageEmptyPlaceholder } from './empty-placeholder';

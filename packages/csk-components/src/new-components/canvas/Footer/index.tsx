import { FooterProps as BaseFooterProps } from '@/new-components/ui/Footer';

export type FooterParameters = BaseFooterProps;

export enum FooterSlots {
  FooterLogo = 'footerLogo',
  FooterCopyright = 'footerCopyright',
  FooterContent = 'footerContent',
}

export { FooterEmptyPlaceholder } from './empty-placeholder';

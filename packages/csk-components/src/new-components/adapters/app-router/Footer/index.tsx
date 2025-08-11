import { FooterProps as BaseFooterProps } from '@/new-components/ui/Footer';
import { ComponentProps } from '@/types/canvasTypes';

export type FooterParameters = BaseFooterProps;

export enum FooterSlots {
  FooterLogo = 'footerLogo',
  FooterCopyright = 'footerCopyright',
  FooterContent = 'footerContent',
}

export type FooterProps = ComponentProps<FooterParameters, FooterSlots>;

export { default } from './footer';
export { footerEmptyPlaceholderWrapper } from './empty-placeholder';

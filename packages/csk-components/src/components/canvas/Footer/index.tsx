import { ComponentProps } from '@uniformdev/canvas-next-rsc/component';
import { FooterProps as BaseFooterProps } from '@/components/ui/Footer';
import { Footer } from './footer';

export type FooterParameters = BaseFooterProps;

export enum FooterSlots {
  FooterLogo = 'footerLogo',
  FooterCopyright = 'footerCopyright',
  FooterContent = 'footerContent',
}

export type FooterProps = ComponentProps<FooterParameters, FooterSlots>;

export default Footer;
export { FooterEmptyPlaceholder } from './empty-placeholder';

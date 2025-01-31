import { ComponentProps } from '@uniformdev/canvas-next-rsc/component';
import { FooterProps as BaseFooterProps } from '@uniformdev/csk-components/components/ui';
import { withPlaygroundWrapper } from '@uniformdev/csk-components/hocs/withPlaygroundWrapper';
import { Footer } from './footer';

export type FooterParameters = BaseFooterProps;

export enum FooterSlots {
  FooterLogo = 'footerLogo',
  FooterCopyright = 'footerCopyright',
  FooterContent = 'footerContent',
}

export type FooterProps = ComponentProps<FooterParameters, FooterSlots>;

export default withPlaygroundWrapper(Footer);
export { FooterEmptyPlaceholder } from './empty-placeholder';

import { FC } from 'react';
import { ComponentProps, UniformSlot } from '@uniformdev/canvas-next-rsc/component';
import BaseFooter, { FooterProps as BaseFooterProps } from '@/components/ui/Footer';
import { withPlaygroundWrapper } from '@/hocs';

export type FooterParameters = BaseFooterProps;

enum FooterSlots {
  FooterLogo = 'footerLogo',
  FooterCopyright = 'footerCopyright',
  FooterContent = 'footerContent',
}

export type FooterProps = ComponentProps<FooterParameters, FooterSlots>;

const Footer: FC<FooterProps> = ({ context, component, slots, backgroundColor, spacing, border, fluidContent }) => (
  <BaseFooter
    logo={<UniformSlot context={context} slot={slots.footerLogo} data={component} />}
    copyright={<UniformSlot context={context} slot={slots.footerCopyright} data={component} />}
    content={<UniformSlot context={context} slot={slots.footerContent} data={component} />}
    {...{ backgroundColor, spacing, border, fluidContent }}
  />
);

export default withPlaygroundWrapper(Footer);

import { FC } from 'react';
import { ComponentProps, UniformSlot } from '@uniformdev/canvas-next-rsc/component';
import { withPlaygroundWrapper } from '@uniformdev/csk-components/hocs/withPlaygroundWrapper';
import BaseFooter, { FooterProps as BaseFooterProps } from '@/components/custom-ui/Footer';
import ItemWrapper from '@/components/custom-ui/ItemWrapper';

export type FooterParameters = BaseFooterProps;

enum FooterSlots {
  FooterCTASection = 'footerCtaSection',
  FooterLogo = 'footerLogo',
  FooterCopyright = 'footerCopyright',
  FooterContent = 'footerContent',
}

export type FooterProps = ComponentProps<FooterParameters, FooterSlots>;

const Footer: FC<FooterProps> = ({ context, component, slots, backgroundColor, spacing, border, fluidContent }) => (
  <BaseFooter
    ctaSection={<UniformSlot context={context} slot={slots.footerCtaSection} data={component} />}
    logo={<UniformSlot context={context} slot={slots.footerLogo} data={component} />}
    copyright={
      <UniformSlot context={context} slot={slots.footerCopyright} data={component}>
        {({ child, key }) => <ItemWrapper key={key}>{child}</ItemWrapper>}
      </UniformSlot>
    }
    content={<UniformSlot context={context} slot={slots.footerContent} data={component} />}
    {...{ backgroundColor, spacing, border, fluidContent }}
  />
);

export default withPlaygroundWrapper(Footer);

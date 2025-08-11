import { FC } from 'react';
import { UniformSlot } from '@uniformdev/canvas-react';
import { FooterEmptyPlaceholder, FooterSlots } from '@/new-components/canvas/Footer';
import BaseFooter from '@/new-components/ui/Footer';
import { FooterProps } from '.';

const Footer: FC<FooterProps> = ({ backgroundColor, spacing, border, fluidContent }) => (
  <BaseFooter
    logo={
      <UniformSlot
        name={FooterSlots.FooterLogo}
        emptyPlaceholder={<FooterEmptyPlaceholder slotName={FooterSlots.FooterLogo} />}
      />
    }
    copyright={
      <UniformSlot
        name={FooterSlots.FooterCopyright}
        emptyPlaceholder={<FooterEmptyPlaceholder slotName={FooterSlots.FooterCopyright} />}
      />
    }
    content={
      <UniformSlot
        name={FooterSlots.FooterContent}
        emptyPlaceholder={<FooterEmptyPlaceholder slotName={FooterSlots.FooterContent} />}
      />
    }
    {...{ backgroundColor, spacing, border, fluidContent }}
  />
);

export default Footer;

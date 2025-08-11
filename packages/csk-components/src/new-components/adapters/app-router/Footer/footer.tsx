import { FC } from 'react';
import { UniformSlot } from '@uniformdev/canvas-next-rsc-v2/component';
import BaseFooter from '@/new-components/ui/Footer';
import { withFlattenParameters } from '@/utils/withFlattenParameters';
import { FooterParameters, FooterProps } from '.';

export const Footer: FC<FooterProps & FooterParameters> = ({
  slots,
  backgroundColor,
  spacing,
  border,
  fluidContent,
}) => (
  <BaseFooter
    logo={<UniformSlot slot={slots.footerLogo} />}
    copyright={<UniformSlot slot={slots.footerCopyright} />}
    content={<UniformSlot slot={slots.footerContent} />}
    {...{ backgroundColor, spacing, border, fluidContent }}
  />
);

export default withFlattenParameters(Footer);

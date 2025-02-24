import { FC } from 'react';
import { UniformSlot } from '@uniformdev/canvas-next-rsc/component';
import BaseFooter from '@/components/ui/Footer';
import { FooterProps } from '.';

export const Footer: FC<FooterProps> = ({
  context,
  component,
  slots,
  backgroundColor,
  spacing,
  border,
  fluidContent,
}) => (
  <BaseFooter
    logo={<UniformSlot context={context} slot={slots.footerLogo} data={component} />}
    copyright={<UniformSlot context={context} slot={slots.footerCopyright} data={component} />}
    content={<UniformSlot context={context} slot={slots.footerContent} data={component} />}
    {...{ backgroundColor, spacing, border, fluidContent }}
  />
);

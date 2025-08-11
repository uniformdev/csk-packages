import { FC } from 'react';
import { EmptyComponentPlaceholder } from '@/new-components/ui/EmptyComponentPlaceholder';
import { FooterSlots } from '.';

export const FooterEmptyPlaceholder: FC<{ slotName: FooterSlots }> = ({ slotName }) => {
  switch (slotName) {
    case FooterSlots.FooterLogo:
      return <div className="h-20 w-48" />;
    case FooterSlots.FooterCopyright:
      return <div className="h-20 w-48" />;
    case FooterSlots.FooterContent:
      return <div className="h-20 w-48" />;
    default:
      return <EmptyComponentPlaceholder />;
  }
};

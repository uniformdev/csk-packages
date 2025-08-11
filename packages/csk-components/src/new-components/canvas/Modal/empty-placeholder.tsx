import { FC } from 'react';
import { EmptyComponentPlaceholder } from '@/new-components/ui/EmptyComponentPlaceholder';
import { ModalSlots } from '.';

export const ModalEmptyPlaceholder: FC<{ slotName: ModalSlots }> = ({ slotName }) => {
  switch (slotName) {
    case ModalSlots.Trigger:
      return <div className="h-20 w-full" />;
    default:
      return <EmptyComponentPlaceholder />;
  }
};

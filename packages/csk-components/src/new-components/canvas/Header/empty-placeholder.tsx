import { FC } from 'react';
import { HeaderSlots } from '@/new-components/canvas/Header';
import { EmptyComponentPlaceholder } from '@/new-components/ui/EmptyComponentPlaceholder';

export const HeaderEmptyPlaceholder: FC<{ slotName: HeaderSlots }> = ({ slotName }) => {
  switch (slotName) {
    case HeaderSlots.HeaderLeftContent:
      return <div className="h-20 w-48" />;
    case HeaderSlots.HeaderCenterContent:
      return <div className="h-20 w-full" />;
    case HeaderSlots.HeaderRightContent:
      return <div className="h-20 w-48" />;
    default:
      return <EmptyComponentPlaceholder />;
  }
};

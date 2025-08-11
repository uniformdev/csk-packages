import { FC } from 'react';
import { CommonPageSlots } from '@/new-components/canvas/Page';
import { EmptyComponentPlaceholder } from '@/new-components/ui/EmptyComponentPlaceholder';

export const PageEmptyPlaceholder: FC<{ slotName: CommonPageSlots }> = ({ slotName }) => {
  switch (slotName) {
    case CommonPageSlots.PageHeader:
      return <div className="h-40" />;
    case CommonPageSlots.PageContent:
      return <div className="h-[calc(100vh-10rem*2)]" />;
    case CommonPageSlots.PageFooter:
      return <div className="h-40" />;
    default:
      return <EmptyComponentPlaceholder />;
  }
};

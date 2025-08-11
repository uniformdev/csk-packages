import { FC } from 'react';
import { UniformSlot } from '@uniformdev/canvas-react';
import { CommonPageSlots, PageEmptyPlaceholder } from '@/new-components/canvas/Page';
import BasePage from '@/new-components/ui/Page';
import { PageProps } from '.';

export const Page: FC<PageProps> = ({
  backgroundColor,
  headerCustomRenderer,
  footerCustomRenderer,
  contentCustomRenderer,
}) => (
  <BasePage
    backgroundColor={backgroundColor}
    header={
      <UniformSlot
        name={CommonPageSlots.PageHeader}
        emptyPlaceholder={<PageEmptyPlaceholder slotName={CommonPageSlots.PageHeader} />}
        wrapperComponent={headerCustomRenderer}
      />
    }
    footer={
      <UniformSlot
        name={CommonPageSlots.PageFooter}
        emptyPlaceholder={<PageEmptyPlaceholder slotName={CommonPageSlots.PageFooter} />}
        wrapperComponent={footerCustomRenderer}
      />
    }
  >
    <UniformSlot
      name={CommonPageSlots.PageContent}
      emptyPlaceholder={<PageEmptyPlaceholder slotName={CommonPageSlots.PageContent} />}
      wrapperComponent={contentCustomRenderer}
    />
  </BasePage>
);

import { FC } from 'react';
import { ComponentProps, CustomSlotChildRenderFunc, UniformSlot } from '@uniformdev/canvas-next-rsc/component';
import BasePage from '@/components/ui/Page';

export type PageParameters = {
  pageTitle?: string;
  backgroundColor?: string;
} & {
  headerCustomRenderer?: CustomSlotChildRenderFunc;
  contentCustomRenderer?: CustomSlotChildRenderFunc;
  footerCustomRenderer?: CustomSlotChildRenderFunc;
};

export enum CommonPageSlots {
  PageContent = 'pageContent',
  PageHeader = 'pageHeader',
  PageFooter = 'pageFooter',
}

export type PageProps = ComponentProps<PageParameters, CommonPageSlots>;

const Page: FC<PageProps> = ({
  slots,
  component,
  context,
  backgroundColor,
  headerCustomRenderer,
  contentCustomRenderer,
  footerCustomRenderer,
}) => (
  <BasePage
    backgroundColor={backgroundColor}
    header={
      <UniformSlot context={context} slot={slots.pageHeader} data={component}>
        {headerCustomRenderer}
      </UniformSlot>
    }
    footer={
      <UniformSlot context={context} slot={slots.pageFooter} data={component}>
        {footerCustomRenderer}
      </UniformSlot>
    }
  >
    <UniformSlot context={context} slot={slots.pageContent} data={component}>
      {contentCustomRenderer}
    </UniformSlot>
  </BasePage>
);

export default Page;

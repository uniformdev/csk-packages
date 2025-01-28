import { FC } from 'react';
import { UniformSlot } from '@uniformdev/canvas-next-rsc/component';
import { Page as BasePage } from '@uniformdev/theme-pack/components/ui';
import { PageProps } from '.';

export const Page: FC<PageProps> = ({
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

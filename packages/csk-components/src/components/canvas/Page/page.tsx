import { FC } from 'react';
import { UniformSlot } from '@uniformdev/canvas-next-rsc-v2/component';
import BasePage from '@/components/ui/Page';
import { withFlattenParameters } from '@/utils/withFlattenParameters';
import { PageProps, PageParameters } from '.';

const Page: FC<PageProps & PageParameters> = ({
  slots,
  backgroundColor,
  headerCustomRenderer,
  contentCustomRenderer,
  footerCustomRenderer,
}) => (
  <BasePage
    backgroundColor={backgroundColor}
    header={<UniformSlot slot={slots.pageHeader}>{headerCustomRenderer}</UniformSlot>}
    footer={<UniformSlot slot={slots.pageFooter}>{footerCustomRenderer}</UniformSlot>}
  >
    <UniformSlot slot={slots.pageContent}>{contentCustomRenderer}</UniformSlot>
  </BasePage>
);

export default withFlattenParameters(Page);

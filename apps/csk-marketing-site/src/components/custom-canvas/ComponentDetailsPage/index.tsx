import { FC } from 'react';
import { UniformSlot } from '@uniformdev/canvas-next-rsc-v2/component';
import { PageProps, PageParameters } from '@uniformdev/csk-components/components/canvas';
import { Page } from '@uniformdev/csk-components/components/ui';
import { withFlattenParameters } from '@uniformdev/csk-components/utils/withFlattenParameters';
import { DEFAULT_COMPONENT_DETAILS_PAGE_ID } from '@/components/custom-canvas/AnchorLinks';

export const ComponentDetailsPage: FC<PageProps & PageParameters> = ({ slots, backgroundColor }) => (
  <Page
    header={<UniformSlot slot={slots.pageHeader} />}
    footer={<UniformSlot slot={slots.pageFooter} />}
    backgroundColor={backgroundColor}
  >
    <div id={DEFAULT_COMPONENT_DETAILS_PAGE_ID}>
      <UniformSlot slot={slots.pageContent} />
    </div>
  </Page>
);

export default withFlattenParameters(ComponentDetailsPage);

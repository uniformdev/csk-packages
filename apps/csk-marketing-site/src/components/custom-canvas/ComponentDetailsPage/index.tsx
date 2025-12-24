import { FC } from 'react';
import { PageProps, PageParameters } from '@uniformdev/csk-components/components/canvas/serverClient';
import { Page } from '@uniformdev/csk-components/components/ui';
import { withFlattenParameters } from '@uniformdev/csk-components/utils/withFlattenParameters';
import { UniformSlot } from '@uniformdev/next-app-router/component';
import { DEFAULT_COMPONENT_DETAILS_PAGE_ID } from '@/components/custom-canvas/AnchorLinks';

export const ComponentDetailsPage: FC<PageProps & PageParameters> = ({ slots, backgroundColor }) => (
  <Page
    backgroundColor={backgroundColor}
    header={<UniformSlot slot={slots.pageHeader} />}
    footer={<UniformSlot slot={slots.pageFooter} />}
  >
    <div id={DEFAULT_COMPONENT_DETAILS_PAGE_ID}>
      <UniformSlot slot={slots.pageContent} />
    </div>
  </Page>
);

export default withFlattenParameters(ComponentDetailsPage);

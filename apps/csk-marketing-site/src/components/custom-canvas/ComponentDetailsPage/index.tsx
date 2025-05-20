import { FC } from 'react';
import { UniformSlot } from '@uniformdev/canvas-next-rsc/component';
import { PageProps } from '@uniformdev/csk-components/components/canvas';
import { Page } from '@uniformdev/csk-components/components/ui';
import { DEFAULT_COMPONENT_DETAILS_PAGE_ID } from '@/components/custom-canvas/AnchorLinks';

export const ComponentDetailsPage: FC<PageProps> = ({ component, context, slots, backgroundColor }) => (
  <Page
    header={<UniformSlot context={context} slot={slots.pageHeader} data={component} />}
    footer={<UniformSlot context={context} slot={slots.pageFooter} data={component} />}
    backgroundColor={backgroundColor}
  >
    <div id={DEFAULT_COMPONENT_DETAILS_PAGE_ID}>
      <UniformSlot context={context} slot={slots.pageContent} data={component} />
    </div>
  </Page>
);

export default ComponentDetailsPage;

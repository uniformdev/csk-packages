import { FC } from 'react';
import { ComponentProps, UniformSlot } from '@uniformdev/canvas-next-rsc/component';
import { Page as BasePage } from '@uniformdev/csk-components/components/ui';
import ComponentsSearchProvider from './ComponentsSearchProvider';

type ComponentsSearchPageParameters = {
  title?: string;
  pageSize?: string;
  backgroundColor?: string;
};

export enum ComponentsSearchPageSlots {
  PageHeader = 'pageHeader',
  PageContent = 'pageContent',
  PageFooter = 'pageFooter',
}

type ComponentsSearchPageProps = ComponentProps<ComponentsSearchPageParameters, ComponentsSearchPageSlots>;

const ComponentsSearchPage: FC<ComponentsSearchPageProps> = ({ backgroundColor, component, context, slots }) => (
  <ComponentsSearchProvider>
    <BasePage
      backgroundColor={backgroundColor}
      header={<UniformSlot context={context} slot={slots.pageHeader} data={component} />}
      footer={<UniformSlot context={context} slot={slots.pageFooter} data={component} />}
    >
      <UniformSlot context={context} slot={slots.pageContent} data={component} />
    </BasePage>
  </ComponentsSearchProvider>
);

export default ComponentsSearchPage;

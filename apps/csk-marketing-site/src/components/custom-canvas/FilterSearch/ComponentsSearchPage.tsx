import { FC } from 'react';
import { Page as BasePage } from '@uniformdev/csk-components/components/ui';
import { ComponentProps } from '@uniformdev/csk-components/types/cskTypes';
import { withFlattenParameters } from '@uniformdev/csk-components/utils/withFlattenParameters';
import { UniformSlot } from '@uniformdev/next-app-router/component';
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

const ComponentsSearchPage: FC<ComponentsSearchPageProps & ComponentsSearchPageParameters> = ({
  backgroundColor,
  slots,
}) => (
  <ComponentsSearchProvider>
    <BasePage
      backgroundColor={backgroundColor}
      header={<UniformSlot slot={slots.pageHeader} />}
      footer={<UniformSlot slot={slots.pageFooter} />}
    >
      <UniformSlot slot={slots.pageContent} />
    </BasePage>
  </ComponentsSearchProvider>
);

export default withFlattenParameters(ComponentsSearchPage);

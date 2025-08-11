import { ComponentType } from 'react';
import { ComponentProps, UniformSlotWrapperComponentProps } from '@uniformdev/canvas-react';
import { PageParameters } from '@/new-components/canvas/Page';

export type PageAdditionalProps = {
  headerCustomRenderer?: ComponentType<UniformSlotWrapperComponentProps>;
  contentCustomRenderer?: ComponentType<UniformSlotWrapperComponentProps>;
  footerCustomRenderer?: ComponentType<UniformSlotWrapperComponentProps>;
};

export type PageProps = ComponentProps<PageParameters> & PageAdditionalProps;

export { Page as default } from './page';

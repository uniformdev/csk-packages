import { UniformSlotProps } from '@uniformdev/canvas-next-rsc-v2/component';
import { CommonPageSlots, PageParameters } from '@/new-components/canvas/Page';
import { ComponentProps } from '@/types/canvasTypes';

export type PageAdditionalProps = {
  headerCustomRenderer?: UniformSlotProps['children'];
  contentCustomRenderer?: UniformSlotProps['children'];
  footerCustomRenderer?: UniformSlotProps['children'];
};

export type PageProps = ComponentProps<PageParameters, CommonPageSlots> & PageAdditionalProps;

export { default } from './page';
export { pageEmptyPlaceholderWrapper } from './empty-placeholder';

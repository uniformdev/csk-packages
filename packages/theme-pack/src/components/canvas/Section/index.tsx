import { ComponentProps } from '@uniformdev/canvas-next-rsc/component';
import { ContainerParameters } from '@uniformdev/theme-pack/components/canvas';

export enum ContentAlignment {
  Left = 'left',
  Center = 'center',
  Right = 'right',
}

export type SectionParameters = ContainerParameters & {
  contentAlignment?: ContentAlignment;
};

export enum SectionVariants {
  Columns = 'columns',
  ColumnsReverse = 'columnsReverse',
}

export enum SectionSlots {
  SectionContent = 'sectionContent',
  SectionMedia = 'sectionMedia',
  SectionCTA = 'sectionCTA',
}

export type SectionProps = ComponentProps<SectionParameters, SectionSlots>;

export { Section as default } from './section';
export { SectionEmptyPlaceholder } from './empty-placeholder';

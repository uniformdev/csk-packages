import { ContainerParameters } from '@/components/canvas/Container/parameters';
import { ComponentProps } from '@/types/cskTypes';

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

export { default } from './section';
export { SectionEmptyPlaceholder } from './empty-placeholder';

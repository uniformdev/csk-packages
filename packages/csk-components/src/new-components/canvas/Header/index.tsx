import { HeaderProps as BaseHeaderProps } from '@/new-components/ui/Header';

export type HeaderParameters = Omit<BaseHeaderProps, 'sticky'>;

export enum HeaderSlots {
  HeaderLeftContent = 'headerLeftContent',
  HeaderCenterContent = 'headerCenterContent',
  HeaderRightContent = 'headerRightContent',
}

export enum HeaderVariants {
  Sticky = 'sticky',
}

export { HeaderEmptyPlaceholder } from './empty-placeholder';

import { ComponentProps } from '@uniformdev/canvas-next-rsc/component';
import { HeaderProps as BaseHeaderProps } from '@/components/ui/Header';
import { Header } from './header';

export type HeaderParameters = Omit<BaseHeaderProps, 'sticky'>;

export enum HeaderSlots {
  HeaderLeftContent = 'headerLeftContent',
  HeaderCenterContent = 'headerCenterContent',
  HeaderRightContent = 'headerRightContent',
}

export enum HeaderVariants {
  Sticky = 'sticky',
}

export type HeaderProps = ComponentProps<HeaderParameters, HeaderSlots>;

export default Header;
export { HeaderEmptyPlaceholder } from './empty-placeholder';

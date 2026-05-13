import type { AssetParamValue } from '@uniformdev/assets';
import type { LinkParamValue } from '@uniformdev/canvas';
import type { TextParameters } from '@/components/canvas/Text/parameters';
import type { ComponentProps, ViewPort } from '@/types/cskTypes';

export type NavigationFlyoutParameters = TextParameters & {
  icon?: AssetParamValue;
  link?: LinkParamValue;
  backgroundColor?: string;
  border?: string | ViewPort<string>;
  caretIcon?: AssetParamValue;
  hoverEffect?: string | ViewPort<string>;
  className?: string;
};

export enum NavigationFlyoutSlots {
  NavigationFlyoutLeftContent = 'navigationFlyoutLeftContent',
  NavigationFlyoutRightContent = 'navigationFlyoutRightContent',
}

export enum NavigationFlyoutVariants {
  MegaMenu = 'megaMenu',
}

export type NavigationFlyoutProps = ComponentProps<NavigationFlyoutParameters, NavigationFlyoutSlots>;

export type MegaMenuCategory = {
  id: string;
  text?: string;
};

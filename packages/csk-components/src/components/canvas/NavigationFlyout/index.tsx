import dynamic from 'next/dynamic';
import { AssetParamValue } from '@uniformdev/assets';
import { LinkParamValue } from '@uniformdev/canvas';
import { ComponentProps } from '@uniformdev/canvas-next-rsc/component';
import { TextParameters } from '@/components/canvas/Text/parameters';
import { withPlaygroundWrapper } from '@/hocs/withPlaygroundWrapper';
import { ViewPort } from '@/types/cskTypes';

export type NavigationFlyoutParameters = TextParameters & {
  icon?: AssetParamValue;
  link?: LinkParamValue;
  backgroundColor?: string;
  border?: string | ViewPort<string>;
};

export enum NavigationFlyoutSlots {
  NavigationFlyoutLeftContent = 'navigationFlyoutLeftContent',
  NavigationFlyoutRightContent = 'navigationFlyoutRightContent',
}

export type NavigationFlyoutProps = ComponentProps<NavigationFlyoutParameters, NavigationFlyoutSlots>;

export default dynamic(() => import('./navigation-flyout').then(mod => withPlaygroundWrapper(mod.NavigationFlyout)));
export { NavigationFlyoutEmptyPlaceholder } from './empty-placeholder';

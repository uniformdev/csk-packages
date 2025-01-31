import dynamic from 'next/dynamic';
import { Asset } from '@uniformdev/assets';
import { LinkParamValue } from '@uniformdev/canvas';
import { ComponentProps } from '@uniformdev/canvas-next-rsc/component';
import { TextParameters as BaseTextParameters } from '@uniformdev/csk-components/components/canvas';
import { withPlaygroundWrapper } from '@uniformdev/csk-components/hocs/withPlaygroundWrapper';
import { ViewPort } from '@uniformdev/csk-components/types/cskTypes';

export type NavigationFlyoutParameters = BaseTextParameters & {
  icon?: Asset[];
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

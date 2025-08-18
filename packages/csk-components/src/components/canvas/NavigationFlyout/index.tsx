import dynamic from 'next/dynamic';
import { AssetParamValue } from '@uniformdev/assets';
import { LinkParamValue } from '@uniformdev/canvas';
import { TextParameters } from '@/components/canvas/Text/parameters';
import BaseImage from '@/components/ui/Image';
import InlineSVG from '@/components/ui/InlineSVG';
import { ComponentProps, ViewPort } from '@/types/cskTypes';
import { resolveAsset } from '@/utils/assets';

const NavigationFlyoutClient = dynamic(() => import('./navigation-flyout-client').then(mod => mod.default));

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

export type NavigationFlyoutProps = ComponentProps<NavigationFlyoutParameters, NavigationFlyoutSlots>;

const NavigationFlyout = (props: NavigationFlyoutProps) => {
  const [resolvedImage] = resolveAsset(props.parameters.icon?.value);
  const { url, title = '' } = resolvedImage || {};

  const renderUrl = () => {
    if (!url) return null;

    return url.endsWith('.svg') ? <InlineSVG src={url} alt={title} fill /> : <BaseImage src={url} alt={title} fill />;
  };

  return <NavigationFlyoutClient icon={renderUrl()} {...props} />;
};

export default NavigationFlyout;

export { NavigationFlyoutEmptyPlaceholder } from './empty-placeholder';

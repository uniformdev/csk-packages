import dynamic from 'next/dynamic';
import BaseImage from '@/components/ui/Image';
import InlineSVG from '@/components/ui/InlineSVG';
import { resolveAsset } from '@/utils/assets';
import { withSlotsDataValue } from '@/utils/withSlotsDataValue';
import { NavigationFlyoutProps, NavigationFlyoutSlots } from './types';

export type { NavigationFlyoutParameters, NavigationFlyoutProps } from './types';
export { NavigationFlyoutSlots, NavigationFlyoutVariants } from './types';

const NavigationFlyoutClient = dynamic(() =>
  import('./navigation-flyout-client').then(mod =>
    withSlotsDataValue(mod.default, [NavigationFlyoutSlots.NavigationFlyoutLeftContent])
  )
);

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

import dynamic from 'next/dynamic';
import { AssetParamValue } from '@uniformdev/assets';
import { LinkParamValue } from '@uniformdev/canvas';
import { TextParameters } from '@/components/canvas/Text/parameters';
import BaseImage from '@/components/ui/Image';
import InlineSVG from '@/components/ui/InlineSVG';
import { ComponentProps, ViewPort } from '@/types/cskTypes';
import { resolveAsset } from '@/utils/assets';

const NavigationGroupClient = dynamic(() => import('./navigation-group-client').then(mod => mod.default));

export type NavigationGroupParameters = TextParameters & {
  icon?: AssetParamValue;
  caretIcon?: AssetParamValue;
  link?: LinkParamValue;
  backgroundColor?: string;
  border?: string | ViewPort<string>;
  hoverEffect?: string | ViewPort<string>;
  className?: string;
};

export enum NavigationGroupSlots {
  Links = 'links',
}

export type NavigationGroupProps = ComponentProps<NavigationGroupParameters, NavigationGroupSlots>;

const NavigationGroup = (props: NavigationGroupProps) => {
  const [resolvedImage] = resolveAsset(props.parameters.icon?.value);
  const { url, title = '' } = resolvedImage || {};

  const renderUrl = () => {
    if (!url) return null;

    return url.endsWith('.svg') ? <InlineSVG src={url} alt={title} fill /> : <BaseImage src={url} alt={title} fill />;
  };

  return <NavigationGroupClient icon={renderUrl()} {...props} />;
};

export default NavigationGroup;
export { NavigationGroupEmptyPlaceholder } from './empty-placeholder';

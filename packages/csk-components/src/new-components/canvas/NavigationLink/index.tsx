import { AssetParamValue } from '@uniformdev/assets';
import { LinkParamValue } from '@uniformdev/canvas';
import { TextParameters } from '@/new-components/canvas/Text';
import { ViewPort } from '@/types/cskTypes';

export type NavigationLinkParameters = TextParameters & {
  icon?: AssetParamValue;
  link?: LinkParamValue;
  activeState?: boolean;
  hoverEffect?: string | ViewPort<string>;
  className?: string;
};

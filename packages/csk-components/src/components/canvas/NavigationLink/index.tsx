import { AssetParamValue } from '@uniformdev/assets';
import { LinkParamValue } from '@uniformdev/canvas';
import { TextParameters } from '@/new-components/canvas/Text';
import { ComponentProps } from '@/types/canvasTypes';
import { ViewPort } from '@/types/cskTypes';

export type NavigationLinkParameters = TextParameters & {
  icon?: AssetParamValue;
  link?: LinkParamValue;
  activeState?: boolean;
  hoverEffect?: string | ViewPort<string>;
  className?: string;
};

export type NavigationLinkProps = ComponentProps<NavigationLinkParameters>;

export { default } from './navigation-link';

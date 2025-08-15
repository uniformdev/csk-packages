import { AssetParamValue } from '@uniformdev/assets';
import { TextParameters } from '@uniformdev/csk-components/components/canvas/serverClient';
import { ComponentProps } from '@uniformdev/csk-components/types/cskTypes';
import { ViewPort } from '@uniformdev/csk-components/types/cskTypes';
import LocaleLink from './navigation-link';

export type LocaleLinkParameters = TextParameters & {
  icon?: AssetParamValue;
  localeCode?: string;
  activeState?: boolean;
  hoverEffect?: string | ViewPort<string>;
  className?: string;
};

export type LocaleLinkProps = ComponentProps<LocaleLinkParameters>;

export default LocaleLink;

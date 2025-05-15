import { AssetParamValue } from '@uniformdev/assets';
import { ComponentProps } from '@uniformdev/canvas-next-rsc/component';
import { TextParameters } from '@uniformdev/csk-components/components/canvas';
import { ViewPort } from '@uniformdev/csk-components/types/cskTypes';
import { LocaleLink } from './navigation-link';

export type LocaleLinkParameters = TextParameters & {
  icon?: AssetParamValue;
  localeCode?: string;
  activeState?: boolean;
  hoverEffect?: string | ViewPort<string>;
  className?: string;
};

export type LocaleLinkProps = ComponentProps<LocaleLinkParameters>;

export default LocaleLink;

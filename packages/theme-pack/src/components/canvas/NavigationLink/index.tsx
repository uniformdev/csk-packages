import { Asset } from '@uniformdev/assets';
import { LinkParamValue } from '@uniformdev/canvas';
import { ComponentProps } from '@uniformdev/canvas-next-rsc/component';
import { TextParameters as BaseTextParameters } from '@uniformdev/theme-pack/components/canvas';
import { withPlaygroundWrapper } from '@uniformdev/theme-pack/hocs/withPlaygroundWrapper';

import { NavigationLink } from './navigation-link';

export type NavigationLinkParameters = BaseTextParameters & {
  icon?: Asset[];
  link?: LinkParamValue;
  activeState?: boolean;
};

export type NavigationLinkProps = ComponentProps<NavigationLinkParameters>;

export default withPlaygroundWrapper(NavigationLink);

import { Asset } from '@uniformdev/assets';
import { ComponentProps } from '@uniformdev/canvas-next-rsc/component';
import { TextParameters as BaseTextParameters } from '@uniformdev/theme-pack/components/canvas';
import { withPlaygroundWrapper } from '@uniformdev/theme-pack/hocs/withPlaygroundWrapper';
import { IconLabel } from './icon-label';

export type IconLabelParameters = BaseTextParameters & {
  icon?: Asset[];
};

export type IconLabelProps = ComponentProps<IconLabelParameters>;

export default withPlaygroundWrapper(IconLabel);

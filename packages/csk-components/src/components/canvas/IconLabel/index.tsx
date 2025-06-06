import { AssetParamValue } from '@uniformdev/assets';
import { ComponentProps } from '@uniformdev/canvas-next-rsc/component';
import { TextParameters } from '@/components/canvas/Text/parameters';
import { IconLabel } from './icon-label';

export type IconLabelParameters = TextParameters & {
  icon?: AssetParamValue;
};

export type IconLabelProps = ComponentProps<IconLabelParameters>;

export default IconLabel;

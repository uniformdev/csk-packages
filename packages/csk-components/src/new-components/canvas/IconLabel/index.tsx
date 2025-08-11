import { AssetParamValue } from '@uniformdev/assets';
import { TextParameters } from '@/new-components/canvas/Text';

export type IconLabelParameters = TextParameters & {
  icon?: AssetParamValue;
};

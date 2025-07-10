import { AssetParamValue } from '@uniformdev/assets';
import { TextParameters } from '@/components/canvas/Text/parameters';
import { ComponentProps } from '@/types/cskTypes';

export type IconLabelParameters = TextParameters & {
  icon?: AssetParamValue;
};

export type IconLabelProps = ComponentProps<IconLabelParameters>;

export { default } from './icon-label';

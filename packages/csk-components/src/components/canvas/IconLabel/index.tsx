import { AssetParamValue } from '@uniformdev/assets';
import { IconLabelProps as BaseIconLabelParameters } from '@/components/ui/IconLabel';
import { ComponentProps } from '@/types/cskTypes';

export type IconLabelParameters = Omit<BaseIconLabelParameters, 'children'> & {
  icon?: AssetParamValue;
};

export type IconLabelProps = ComponentProps<IconLabelParameters>;

export { default } from './icon-label';

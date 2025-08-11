import { AssetParamValue } from '@uniformdev/assets';
import { LinkParamValue } from '@uniformdev/canvas';
import { ButtonProps as BaseButtonProps } from '@/new-components/ui/Button';
import { ViewPort } from '@/types/cskTypes';

export type ButtonParameters = {
  text?: string;
  link?: LinkParamValue;
  textColor?: string;
  textWeight?: string;
  textFont?: 'uppercase' | 'lowercase' | 'capitalize' | 'normal-case';
  textTransform?: string;
  buttonColor?: string;
  border?: string | ViewPort<string>;
  size?: string;
  icon?: AssetParamValue;
  test?: AssetParamValue;
  textSize?: BaseButtonProps['textSize'];
  iconPosition?: BaseButtonProps['iconPosition'];
  hoverButtonColor?: string;
  hoverTextColor?: string;
};

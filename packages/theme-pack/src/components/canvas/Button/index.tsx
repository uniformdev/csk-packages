import { DefaultTheme } from 'tailwindcss/types/generated/default-theme';
import { Asset } from '@uniformdev/assets';
import { LinkParamValue } from '@uniformdev/canvas';
import { ComponentProps } from '@uniformdev/canvas-next-rsc/component';
import { ButtonProps as BaseButtonProps } from '@uniformdev/theme-pack/components/ui';
import { withPlaygroundWrapper } from '@uniformdev/theme-pack/hocs/withPlaygroundWrapper';
import { ViewPort } from '@uniformdev/theme-pack/types/cskTypes';
import { Button } from './button';

export type ButtonAdditionalProps = {
  className?: string;
  onClick?: () => void;
};

export type ButtonParameters = {
  text?: string;
  link?: LinkParamValue;
  textColor?: string;
  textWeight?: keyof DefaultTheme['fontWeight'];
  textFont?: 'uppercase' | 'lowercase' | 'capitalize' | 'normal-case';
  textTransform?: string;
  buttonColor?: string;
  border?: string | ViewPort<string>;
  size?: string;
  icon?: Asset[];
  textSize?: BaseButtonProps['textSize'];
  iconPosition?: BaseButtonProps['iconPosition'];
  hoverButtonColor?: string;
  hoverTextColor?: string;
};

export type ButtonProps = ComponentProps<ButtonParameters & ButtonAdditionalProps>;

export default withPlaygroundWrapper(Button);

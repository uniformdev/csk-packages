import { FC } from 'react';
import { DefaultTheme } from 'tailwindcss/types/generated/default-theme';
import { Asset } from '@uniformdev/assets';
import { LinkParamValue } from '@uniformdev/canvas';
import { ComponentProps, UniformText } from '@uniformdev/canvas-next-rsc/component';
import BaseButton, { ButtonProps as BaseButtonProps } from '@/components/ui/Button';
import BaseImage from '@/components/ui/Image';
import { withPlaygroundWrapper } from '@/hocs';
import { ViewPort } from '@/types';
import { formatUniformLink, resolveAsset } from '@/utils';

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

const Button: FC<ButtonProps> = ({
  component,
  context,
  link,
  textColor,
  textFont,
  textWeight,
  textTransform,
  buttonColor,
  icon,
  iconPosition,
  border,
  size,
  textSize,
  hoverButtonColor,
  hoverTextColor,
  className,
  onClick,
}) => {
  const href = formatUniformLink(link);

  const Icon = () => {
    const [resolvedImage] = resolveAsset(icon);
    const { url, title = '' } = resolvedImage || {};

    if (!url) return undefined;

    return (
      <BaseImage
        src={url}
        alt={title}
        width={20}
        height={20}
        containerStyle={{
          width: '20px',
          height: '20px',
        }}
      />
    );
  };
  return (
    <BaseButton
      variant={component.variant as BaseButtonProps['variant']}
      href={href}
      border={border}
      size={size}
      onClick={onClick}
      className={className}
      textSize={textSize}
      isActive={context.matchedRoute === href}
      textColor={textColor}
      textFont={textFont}
      textWeight={textWeight}
      textTransform={textTransform}
      buttonColor={buttonColor}
      hoverButtonColor={hoverButtonColor}
      hoverTextColor={hoverTextColor}
      icon={<Icon />}
      iconPosition={iconPosition}
    >
      <UniformText placeholder="Button text goes here" parameterId="text" component={component} context={context} />
    </BaseButton>
  );
};

export default withPlaygroundWrapper(Button);

import { FC } from 'react';
import { UniformText } from '@uniformdev/canvas-next-rsc/component';
import {
  Image as BaseImage,
  Button as BaseButton,
  ButtonProps as BaseButtonProps,
} from '@uniformdev/csk-components/components/ui';
import { resolveAsset } from '@uniformdev/csk-components/utils/assets';
import { formatUniformLink } from '@uniformdev/csk-components/utils/routing';
import { ButtonProps } from '.';

export const Button: FC<ButtonProps> = ({
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

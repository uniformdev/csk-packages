import { FC, useMemo } from 'react';
import { ComponentParameter, UniformText } from '@uniformdev/canvas-next-rsc-v2/component';
import BaseButton, { ButtonProps as BaseButtonProps } from '@/components/ui/Button';
import BaseImage from '@/components/ui/Image';
import { ReplaceFieldsWithAssets } from '@/types/cskTypes';
import { formatUniformLink } from '@/utils/routing';
import { withFlattenParameters } from '@/utils/withFlattenParameters';
import { ButtonParameters, ButtonProps } from '.';

const Button: FC<ButtonProps & ReplaceFieldsWithAssets<ButtonParameters, 'icon'>> = ({
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
  text,
  variant,
  parameters,
}) => {
  const href = formatUniformLink(link);

  const iconParameters = useMemo(() => {
    const [resolvedImage] = icon || [];
    const { url, title = '' } = resolvedImage || {};
    if (!url) return undefined;

    return {
      url,
      title,
    };
  }, [icon]);

  const Icon = () => {
    if (!iconParameters) return undefined;

    const { url, title } = iconParameters;

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

  const hasContent = !!text || !!iconParameters;

  if (!hasContent && !context.isContextualEditing) return null;

  return (
    <BaseButton
      variant={variant as BaseButtonProps['variant']}
      href={href}
      border={border}
      size={size}
      onClick={onClick}
      className={className}
      textSize={textSize}
      isActive={context.pageState.routePath === href}
      textColor={textColor}
      textFont={textFont}
      textWeight={textWeight}
      textTransform={textTransform}
      buttonColor={buttonColor}
      hoverButtonColor={hoverButtonColor}
      hoverTextColor={hoverTextColor}
      // eslint-disable-next-line react-hooks/static-components
      icon={<Icon />}
      iconPosition={iconPosition}
    >
      <UniformText
        placeholder="Button text goes here"
        parameter={parameters.text as ComponentParameter<string>}
        component={component}
      />
    </BaseButton>
  );
};

export default withFlattenParameters(Button);

import { FC } from 'react';
import BaseLink from '@/components/ui/Link';
import { resolveColor, resolveHoverColor } from '@/utils/colorPalette';
import { isExternalLink } from '@/utils/routing';
import { cn, resolveViewPort } from '@/utils/styling';
import { ButtonProps, ButtonVariant } from '.';

const ButtonWrapper: FC<ButtonProps> = ({ children, href, className, style, onClick }) => {
  const isCurrentLinkExternal = isExternalLink(href);
  return href ? (
    <BaseLink
      className={className}
      style={style}
      link={href}
      openInNewTab={isCurrentLinkExternal}
      rel={isCurrentLinkExternal ? 'noopener noreferrer' : ''}
    >
      {children}
    </BaseLink>
  ) : (
    <button onClick={onClick} className={className} style={style}>
      {children}
    </button>
  );
};

export const Button: FC<ButtonProps> = ({
  variant,
  children,
  href,
  className,
  style,
  onClick,
  textColor,
  textSize,
  buttonColor,
  isActive,
  icon,
  iconPosition,
  border = '',
  textTransform = '',
  textWeight,
  textFont,
  size,
  hoverButtonColor,
  hoverTextColor,
}) => {
  const text = resolveColor(textColor, 'text');
  const buttonBg = resolveColor(buttonColor, 'background');
  const hoverText = resolveHoverColor(hoverTextColor, 'text');
  const hoverBg = resolveHoverColor(hoverButtonColor, 'background');
  const hoverDecoration = resolveHoverColor(buttonColor, 'decoration');

  const baseStyles = cn(
    'block w-max font-medium focus-visible:outline-none focus-visible:ring-1 disabled:pointer-events-none disabled:opacity-50',
    text.className,
    hoverText.className,
    {
      'flex flex-row gap-x-2': icon,
      'flex-row-reverse': icon && iconPosition === 'right',
      [`font-${textFont}`]: !!textFont,
      [`font-${textWeight}`]: !!textWeight,
      [`p-${size}`]: size,
      [textTransform]: !!textTransform,
      [resolveViewPort(border, '{value}')]: border,
      [resolveViewPort(textSize, 'text-{value}')]: textSize,
    }
  );
  const defaultStyles = cn(buttonBg.className, hoverBg.className);
  const linkStyles = cn('bg-transparent hover:underline hover:opacity-100', hoverDecoration.className, {
    '!underline': href === isActive,
  });
  return (
    <ButtonWrapper
      href={href}
      onClick={onClick}
      className={cn(
        baseStyles,
        {
          [defaultStyles]: !variant,
          [linkStyles]: variant === ButtonVariant.Link,
        },
        className
      )}
      style={{
        ...text.style,
        ...(variant ? {} : buttonBg.style),
        ...hoverText.style,
        ...(variant ? {} : hoverBg.style),
        ...(variant === ButtonVariant.Link ? hoverDecoration.style : {}),
        ...style,
      }}
    >
      {icon}
      {children}
    </ButtonWrapper>
  );
};

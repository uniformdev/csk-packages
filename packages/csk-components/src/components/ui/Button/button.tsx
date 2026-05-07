import { FC } from 'react';
import BaseLink from '@/components/ui/Link';
import { isCustomColor, resolveColor } from '@/utils/colorPalette';
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

  // Hover variants stay token-only — Tailwind cannot generate hover classes for
  // arbitrary runtime colors. If the author picks a `custom:` value here, no hover
  // change is rendered (documented limitation).
  const hoverTextClass = hoverTextColor && !isCustomColor(hoverTextColor) ? `hover:text-${hoverTextColor}` : '';
  const hoverBgClass = hoverButtonColor && !isCustomColor(hoverButtonColor) ? `hover:bg-${hoverButtonColor}` : '';
  const hoverDecorationClass = buttonColor && !isCustomColor(buttonColor) ? `hover:decoration-${buttonColor}` : '';

  const baseStyles = cn(
    'block w-max font-medium focus-visible:outline-none focus-visible:ring-1 disabled:pointer-events-none disabled:opacity-50',
    text.className,
    hoverTextClass,
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
  const defaultStyles = cn(buttonBg.className, hoverBgClass);
  const linkStyles = cn('bg-transparent hover:underline hover:opacity-100', hoverDecorationClass, {
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
        ...style,
      }}
    >
      {icon}
      {children}
    </ButtonWrapper>
  );
};

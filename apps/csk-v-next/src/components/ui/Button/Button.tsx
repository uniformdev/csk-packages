import { FC } from 'react';
import Link from 'next/link';
import { cn, resolveViewPort } from '@/utils';
import { ButtonProps, ButtonVariant } from '.';

const ButtonWrapper: FC<ButtonProps> = ({ children, href, className, onClick }) =>
  href ? (
    <Link className={className} href={href}>
      {children}
    </Link>
  ) : (
    <button onClick={onClick} className={className}>
      {children}
    </button>
  );

export const Button: FC<ButtonProps> = ({
  variant,
  children,
  href,
  className,
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
  const baseStyles = cn(
    'block w-max font-medium focus-visible:outline-none focus-visible:ring-1 disabled:pointer-events-none disabled:opacity-50',
    {
      [`text-${textColor}`]: textColor,
      [`hover:text-${hoverTextColor}`]: hoverTextColor,
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
  const defaultStyles = cn({
    [`bg-${buttonColor}`]: buttonColor,
    [`hover:bg-${hoverButtonColor}`]: hoverButtonColor,
  });
  const linkStyles = cn('bg-transparent hover:underline hover:opacity-100', {
    [`hover:decoration-${buttonColor}`]: buttonColor,
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
    >
      {icon}
      {children}
    </ButtonWrapper>
  );
};

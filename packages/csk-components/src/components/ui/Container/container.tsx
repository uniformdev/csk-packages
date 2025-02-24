import { FC } from 'react';
import { cn, formatSpaceParameterValue, resolveViewPort } from '@/utils/styling';
import { ContainerProps } from '.';

export const Container: FC<ContainerProps> = ({
  className,
  wrapperClassName,
  style,
  children,
  backgroundColor,
  spacing,
  border = '',
  fluidContent = false,
  fullHeight = false,
  ...rest
}) => {
  const [
    fixedSpacingValue,
    { marginTop, marginBottom, marginRight, marginLeft, paddingTop, paddingBottom, paddingRight, paddingLeft },
  ] = formatSpaceParameterValue(spacing);

  return (
    <div
      className={cn(
        'px-4 xl:px-0',
        { 'mx-auto w-full max-w-7xl': !fluidContent, '!px-0': fluidContent },
        wrapperClassName
      )}
    >
      <div
        className={cn(
          {
            '!h-screen': fullHeight,
            [`bg-${backgroundColor}`]: !!backgroundColor,
            [resolveViewPort(marginTop, 'mt-{value}')]: marginTop,
            [resolveViewPort(marginBottom, 'mb-{value}')]: marginBottom,
            [resolveViewPort(marginRight, 'mr-{value}')]: marginRight,
            [resolveViewPort(marginLeft, 'ml-{value}')]: marginLeft,
            [resolveViewPort(paddingTop, 'pt-{value}')]: paddingTop,
            [resolveViewPort(paddingBottom, 'pb-{value}')]: paddingBottom,
            [resolveViewPort(paddingRight, 'pr-{value}')]: paddingRight,
            [resolveViewPort(paddingLeft, 'pl-{value}')]: paddingLeft,
            [resolveViewPort(border, '{value}')]: border,
          },
          className
        )}
        style={{ ...fixedSpacingValue, ...style }}
        {...rest}
      >
        {children}
      </div>
    </div>
  );
};

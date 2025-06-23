import { FC } from 'react';
import { cn, formatSpaceParameterValue, resolveViewPort } from '@/utils/styling';
import { ContainerProps } from '.';
import { getHeightValue } from './utils';

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
  fitHeight = false,
  height,
  maxWidth,
  ...rest
}) => {
  const [
    fixedSpacingValue,
    { marginTop, marginBottom, marginRight, marginLeft, paddingTop, paddingBottom, paddingRight, paddingLeft },
  ] = formatSpaceParameterValue(spacing);

  const heightValue = getHeightValue({ height, fullHeight, fitHeight });

  return (
    <div
      className={cn(
        'px-4 xl:px-0',
        {
          '!px-0': fluidContent,
          'mx-auto w-full': !fluidContent,
          'max-w-7xl max-w-container-width': !maxWidth && !fluidContent,
          [`max-w-${maxWidth}`]: !!maxWidth && !fluidContent,
          [resolveViewPort(heightValue, 'h-{value}')]: heightValue,
        },
        wrapperClassName
      )}
    >
      <div
        className={cn(
          {
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
            [resolveViewPort(heightValue, 'h-{value}')]: heightValue,
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

import { FC } from 'react';
import BaseContainer, { getHeightValue } from '@/components/ui/Container';
import { cn, resolveViewPort } from '@/utils/styling';
import { FlexProps } from '.';

export const Flex: FC<FlexProps> = ({
  className,
  wrapperClassName,
  direction,
  justifyContent,
  gap,
  alignItems,
  backgroundColor,
  spacing,
  border,
  fluidContent,
  fullHeight,
  fitHeight,
  height,
  children,
}) => {
  const heightValue = getHeightValue({ height, fullHeight, fitHeight });

  return (
    <BaseContainer
      {...{ backgroundColor, spacing, border, fluidContent, fullHeight, fitHeight, height, wrapperClassName }}
    >
      <div
        className={cn(
          'flex',
          {
            [resolveViewPort(direction, 'flex-{value}')]: direction,
            [resolveViewPort(justifyContent, 'justify-{value}')]: justifyContent,
            [resolveViewPort(gap, 'gap-{value}')]: gap,
            [resolveViewPort(alignItems, 'items-{value}')]: alignItems,
            [resolveViewPort(heightValue, 'h-{value}')]: heightValue,
          },
          className
        )}
      >
        {children}
      </div>
    </BaseContainer>
  );
};

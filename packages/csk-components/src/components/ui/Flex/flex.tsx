import { FC } from 'react';
import BaseContainer from '@/components/ui/Container';
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
  children,
}) => (
  <BaseContainer {...{ backgroundColor, spacing, border, fluidContent, fullHeight, wrapperClassName }}>
    <div
      className={cn(
        'flex',
        {
          [resolveViewPort(direction, 'flex-{value}')]: direction,
          [resolveViewPort(justifyContent, 'justify-{value}')]: justifyContent,
          [resolveViewPort(gap, 'gap-{value}')]: gap,
          [resolveViewPort(alignItems, 'items-{value}')]: alignItems,
        },
        className
      )}
    >
      {children}
    </div>
  </BaseContainer>
);

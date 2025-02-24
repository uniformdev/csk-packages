import { FC } from 'react';
import BaseContainer from '@/components/ui/Container';
import { cn, resolveViewPort } from '@/utils/styling';
import { GridProps } from '.';

export const Grid: FC<GridProps> = ({
  className,
  columnsCount,
  gapX,
  gapY,
  backgroundColor,
  spacing,
  border,
  fluidContent,
  fullHeight,
  children,
}) => (
  <BaseContainer {...{ backgroundColor, spacing, border, fluidContent, fullHeight }}>
    <div
      className={cn(
        'grid',
        {
          [resolveViewPort(columnsCount, 'grid-cols-{value}')]: columnsCount,
          [resolveViewPort(gapX, 'gap-x-{value}')]: gapX,
          [resolveViewPort(gapY, 'gap-y-{value}')]: gapY,
        },
        className
      )}
    >
      {children}
    </div>
  </BaseContainer>
);

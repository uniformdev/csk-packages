import { FC } from 'react';
import BaseContainer, { getHeightValue } from '@/components/ui/Container';
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
  fitHeight,
  height,
  children,
}) => {
  const heightValue = getHeightValue({ height, fullHeight, fitHeight });

  return (
    <BaseContainer {...{ backgroundColor, spacing, border, fluidContent, fullHeight, fitHeight, height }}>
      <div
        className={cn(
          'grid',
          {
            [resolveViewPort(columnsCount, 'grid-cols-{value}')]: columnsCount,
            [resolveViewPort(gapX, 'gap-x-{value}')]: gapX,
            [resolveViewPort(gapY, 'gap-y-{value}')]: gapY,
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

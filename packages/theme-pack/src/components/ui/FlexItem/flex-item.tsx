import { FC } from 'react';
import { cn, resolveViewPort } from '@uniformdev/theme-pack/utils/styling';
import { FlexItemProps } from '.';

export const FlexItem: FC<FlexItemProps> = ({ className, alignSelf, shrink, children }) => (
  <div
    className={cn(
      {
        [resolveViewPort(alignSelf, 'self-{value}')]: alignSelf,
        [`shrink-${shrink}`]: shrink,
      },
      className
    )}
  >
    {children}
  </div>
);

import { FC } from 'react';
import { cn } from '@uniformdev/theme-pack/utils/styling';
import { DividerProps } from '.';

export const Divider: FC<DividerProps> = ({ color, thickness, width, alignment }) => (
  <div className={cn('flex w-full', `justify-${alignment || 'center'}`)}>
    <div className={cn({ [`bg-${color}`]: !!color })} style={{ width, height: thickness }} />
  </div>
);

import { FC } from 'react';
import { ComponentProps } from '@uniformdev/canvas-next-rsc/component';
import { cn } from '@/utils';

export type DividerParameters = {
  color?: string;
  thickness?: '1px' | '2px' | '3px' | '4px' | '5px' | '6px' | '7px' | '8px' | '9px' | '10px';
  width?: '100%' | '90%' | '80%' | '70%' | '60%' | '50%' | '40%' | '30%' | '20%' | '10%';
  alignment?: 'start' | 'center' | 'end';
};

type DividerProps = ComponentProps<DividerParameters>;

const Divider: FC<DividerProps> = ({ color, thickness, width, alignment }) => (
  <div className={cn('flex w-full', `justify-${alignment || 'center'}`)}>
    <div className={cn({ [`bg-${color}`]: !!color })} style={{ width, height: thickness }} />
  </div>
);

export default Divider;

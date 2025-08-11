import { FC } from 'react';
import { DividerParameters } from '@/new-components/canvas/Divider';
import { cn } from '@/utils/styling';
import { withFlattenParameters } from '@/utils/withFlattenParameters';
import { DividerProps } from '.';

const Divider: FC<DividerProps & DividerParameters> = ({ color, thickness, width, alignment }) => (
  <div className={cn('flex w-full', `justify-${alignment || 'center'}`)}>
    <div className={cn({ [`bg-${color}`]: !!color })} style={{ width, height: thickness }} />
  </div>
);

export default withFlattenParameters(Divider);

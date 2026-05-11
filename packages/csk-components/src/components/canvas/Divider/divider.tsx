import { FC } from 'react';
import { resolveColor } from '@/utils/colorPalette';
import { cn } from '@/utils/styling';
import { withFlattenParameters } from '@/utils/withFlattenParameters';
import { DividerParameters, DividerProps } from '.';

const Divider: FC<DividerProps & DividerParameters> = ({ color, thickness, width, alignment }) => {
  const bg = resolveColor(color, 'background');
  return (
    <div className={cn('flex w-full', `justify-${alignment || 'center'}`)}>
      <div className={bg.className} style={{ ...bg.style, width, height: thickness }} />
    </div>
  );
};

export default withFlattenParameters(Divider);

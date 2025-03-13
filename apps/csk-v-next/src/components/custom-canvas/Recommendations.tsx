import { FC } from 'react';
import { ComponentProps, UniformSlot } from '@uniformdev/canvas-next-rsc/component';

enum RecommendationsSlots {
  Recommendations = 'recommendations',
}

const Recommendations: FC<ComponentProps<Record<string, unknown>, RecommendationsSlots>> = ({
  component,
  context,
  slots,
}) => (
  <div className="flex flex-row flex-wrap gap-4 *:*:h-full *:w-[300px]">
    <UniformSlot data={component} context={context} slot={slots.recommendations} />
  </div>
);

export default Recommendations;

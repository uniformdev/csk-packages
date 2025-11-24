import { FC } from 'react';
import { ComponentProps, UniformSlot } from '@uniformdev/canvas-next-rsc-v2/component';

enum RecommendationsSlots {
  Recommendations = 'recommendations',
}

const Recommendations: FC<ComponentProps<Record<string, unknown>, RecommendationsSlots>> = ({ slots }) => (
  <div className="flex flex-row flex-wrap gap-4 *:*:h-full *:w-[300px]">
    <UniformSlot slot={slots.recommendations} />
  </div>
);

export default Recommendations;

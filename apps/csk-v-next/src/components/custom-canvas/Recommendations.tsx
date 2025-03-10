import { FC } from 'react';
import { ComponentProps, UniformSlot } from '@uniformdev/canvas-next-rsc/component';

enum RecommendationsSlots {
  Recommendations = 'recommendations',
}

const Recommendations: FC<ComponentProps<Record<string, unknown>, RecommendationsSlots>> = ({
  component,
  context,
  slots,
}) => <UniformSlot data={component} context={context} slot={slots.recommendations} />;

export default Recommendations;

import { FC } from 'react';
import { ComponentProps, UniformSlot } from '@uniformdev/canvas-next-rsc/component';

enum AiConfigurationSlots {
  interestRecommendations = 'interestRecommendations',
  cartRecommendations = 'cartRecommendations',
  cartPattern = 'cartPattern',
}

const AiConfiguration: FC<ComponentProps<Record<string, unknown>, AiConfigurationSlots>> = ({
  component,
  context,
  slots,
}) => (
  <div>
    <div className="flex flex-row flex-wrap items-stretch gap-4 *:w-[300px] [&>div>div>div]:h-full [&>div>div]:h-full ">
      <UniformSlot data={component} context={context} slot={slots.interestRecommendations} />
      <UniformSlot data={component} context={context} slot={slots.cartRecommendations} />
    </div>
    <UniformSlot data={component} context={context} slot={slots.cartPattern} />
  </div>
);

export default AiConfiguration;

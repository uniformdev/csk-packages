import { FC } from 'react';
import { UniformSlot } from '@uniformdev/canvas-next-rsc/component';

import { AssistantScrollSectionProps } from '.';

export const AssistantScrollSection: FC<AssistantScrollSectionProps> = ({ component, context, slots }) => (
  <div className="no-scrollbar w-full overflow-x-auto">
    {/* TODO: fix height */}
    <div className="flex w-max items-stretch gap-2 py-2 [&>div>div>div]:h-full [&>div>div]:h-full [&>div]:w-[300px]">
      <UniformSlot data={component} context={context} slot={slots.content} />
    </div>
  </div>
);

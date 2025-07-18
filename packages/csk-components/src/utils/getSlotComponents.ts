'server-only';

import { SlotDefinition } from '@uniformdev/canvas-next-rsc-shared-v2';
import { createCompositionCache } from '@uniformdev/canvas-next-rsc-v2';
import { ComponentProps } from '@/types/cskTypes';

export const compositionCache = createCompositionCache();

export const getSlotComponents = <T>(slot: SlotDefinition, context: ComponentProps<T>['context']) =>
  slot.items.map(slot =>
    compositionCache.getUniformComponent({
      componentId: slot!._id,
      compositionId: context._id,
    })
  );

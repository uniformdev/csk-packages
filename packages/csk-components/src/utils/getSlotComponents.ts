'server-only';

import { createCompositionCache } from '@uniformdev/next-app-router';
import { SlotDefinition } from '@uniformdev/next-app-router-shared';
import { ComponentProps } from '@/types/cskTypes';

export const compositionCache = createCompositionCache();

export const getSlotComponents = <T>(slot: SlotDefinition, context: ComponentProps<T>['context']) =>
  slot.items.map(slot =>
    compositionCache.getUniformComponent({
      componentId: slot!._id,
      compositionId: context._id,
    })
  );

import { CompositionContext } from '@uniformdev/canvas-next-rsc/component';
import { resolveRouteToPath } from '@/utils/routing';
import { cn } from '@/utils/styling';
type BaseIconLabelClassesProps = {
  activeState?: boolean;
  context: CompositionContext;
  href: string;
};

export const getBaseIconLabelClasses = ({ activeState, context, href }: BaseIconLabelClassesProps) =>
  cn('hover:underline', {
    underline: activeState && resolveRouteToPath(context.matchedRoute, context.dynamicInputs) === href,
  });

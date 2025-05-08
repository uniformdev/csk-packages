import { CompositionContext } from '@uniformdev/canvas-next-rsc/component';
import { cn } from '@uniformdev/csk-components/utils/styling';
import { resolveRouteToPath } from '@/utils/routing';
type BaseIconLabelClassesProps = {
  activeState?: boolean;
  context: CompositionContext;
  href: string;
};

export const getBaseIconLabelClasses = ({ activeState, context, href }: BaseIconLabelClassesProps) =>
  cn('hover:underline', {
    underline: activeState && resolveRouteToPath(context.matchedRoute, context.dynamicInputs) === href,
  });

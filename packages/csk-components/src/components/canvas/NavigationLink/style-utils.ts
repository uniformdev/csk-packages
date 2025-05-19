import { CompositionContext } from '@uniformdev/canvas-next-rsc/component';
import { resolveRouteToPath } from '@/utils/routing';
import { cn } from '@/utils/styling';

type BaseIconLabelClassesProps = {
  activeState?: boolean;
  context: CompositionContext;
  href: string;
  hoverEffect?: 'none' | 'underline' | 'brightness' | 'scale';
};

export const getBaseIconLabelClasses = ({ activeState, context, href, hoverEffect }: BaseIconLabelClassesProps) => {
  const isActive = activeState && resolveRouteToPath(context.matchedRoute, context.dynamicInputs) === href;

  const effectsMap: Record<string, string> = {
    brightness: 'opacity-75',
    underline: 'underline',
    scale: 'scale-105',
  };

  const hoverEffectClass = hoverEffect && effectsMap[hoverEffect] && `hover:${effectsMap[hoverEffect]}`;
  const activeEffectClass = hoverEffect && effectsMap[hoverEffect] && isActive ? effectsMap[hoverEffect] : '';

  return cn(hoverEffectClass, activeEffectClass);
};

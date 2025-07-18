import { ResolveComponentFunction, ResolveComponentResult } from '@uniformdev/canvas-next-rsc-v2';
import ComponentEmptyPlaceholder from '@/components/ui/ComponentEmptyPlaceholder';

export type ComponentMapping = Record<string, ResolveComponentResult['component']>;

const createComponentResolver =
  (mappings: ComponentMapping): ResolveComponentFunction =>
  ({ component }) => ({
    component: mappings[component?.type] || ComponentEmptyPlaceholder,
  });

export default createComponentResolver;

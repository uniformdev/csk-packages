import { ComponentType } from 'react';
import { ComponentProps } from '@uniformdev/canvas-next-rsc/component';
import { ResolveEmptyPlaceholderOptions } from '@/types/cskTypes';

export const DEFAULT_EMPTY_PLACEHOLDER = { component: () => <div className="h-20 w-full" /> };

export type EmptyPlaceholderMapping = Record<
  string,
  (props: ResolveEmptyPlaceholderOptions) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    component: ComponentType<ComponentProps<any, any>> | null;
  }
>;

const createEmptyPlaceholderResolver =
  (mappings: EmptyPlaceholderMapping) =>
  ({ parentComponent, ...restProps }: ResolveEmptyPlaceholderOptions) =>
    parentComponent
      ? mappings[parentComponent.type]?.({ parentComponent, ...restProps }) || DEFAULT_EMPTY_PLACEHOLDER
      : DEFAULT_EMPTY_PLACEHOLDER;

export default createEmptyPlaceholderResolver;

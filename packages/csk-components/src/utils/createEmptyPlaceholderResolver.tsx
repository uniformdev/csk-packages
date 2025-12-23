import { ComponentType } from 'react';
import { ComponentProps } from '@uniformdev/next-app-router/component';
import { ResolveEmptyPlaceholderOptions } from '@/types/cskTypes';

export const DEFAULT_EMPTY_PLACEHOLDER = { component: () => <div className="h-full min-h-20 w-full" /> };

export type EmptyPlaceholderMapping = Record<
  string,
  (props: ResolveEmptyPlaceholderOptions) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    component: ComponentType<ComponentProps<any, any>> | null;
  }
>;

const createEmptyPlaceholderResolver = (mappings: EmptyPlaceholderMapping) => (props: ResolveEmptyPlaceholderOptions) =>
  mappings[props?.parentComponent?.type]?.(props) || DEFAULT_EMPTY_PLACEHOLDER;

export default createEmptyPlaceholderResolver;

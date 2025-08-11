import { ComponentParameter } from '@uniformdev/canvas-next-rsc-shared-v2';

type ToComponentParameters<T> = {
  [K in keyof T]: ComponentParameter<T[K]>;
};

export type ComponentProps<
  T,
  S extends string = string,
> = import('@uniformdev/canvas-next-rsc-v2/component').ComponentProps<ToComponentParameters<T>, S>;

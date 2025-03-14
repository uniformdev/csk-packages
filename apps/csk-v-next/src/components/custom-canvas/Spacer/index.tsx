import { ComponentProps } from '@uniformdev/canvas-next-rsc/component';
import { ViewPort } from '@/types/cskTypes';
export type SpacerParameters = {
  size?: string | ViewPort<string>;
};
export enum SpacerVariants {
  Horizontal = 'horizontal',
}

export type SpacerProps = ComponentProps<SpacerParameters>;

export { Spacer as default } from './spacer';

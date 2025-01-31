import { ComponentProps } from '@uniformdev/canvas-next-rsc/component';

export type SpacerParameters = {
  size?: string;
};
export enum SpacerVariants {
  Horizontal = 'horizontal',
}

export type SpacerProps = ComponentProps<SpacerParameters>;

export { Spacer as default } from './spacer';

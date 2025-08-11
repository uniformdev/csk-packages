import { ComponentProps } from '@uniformdev/canvas-react';
import { GridParameters } from '@/new-components/canvas/Grid';

export type GridAdditionalProps = {
  className?: string;
};

export type GridProps = ComponentProps<GridParameters> & GridAdditionalProps;

export { default } from './grid';

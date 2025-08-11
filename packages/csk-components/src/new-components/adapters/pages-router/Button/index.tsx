import { ComponentProps } from '@uniformdev/canvas-react';
import { ButtonParameters } from '@/new-components/canvas/Button';

export type ButtonAdditionalProps = {
  className?: string;
  onClick?: () => void;
};

export type ButtonProps = ComponentProps<ButtonParameters> & ButtonAdditionalProps;

export { default } from './button';

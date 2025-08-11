import { ButtonParameters } from '@/new-components/canvas/Button';
import { ComponentProps } from '@/types/canvasTypes';

export type ButtonAdditionalProps = {
  className?: string;
  onClick?: () => void;
};

export type ButtonProps = ComponentProps<ButtonParameters> & ButtonAdditionalProps;

export { default } from './button';

import { ComponentProps } from '@/types/cskTypes';

export type BadgeParameters = {
  text?: string;
  textColor?: string;
  backgroundColor?: string;
  borderColor?: string;
  dotColor?: string;
  pill?: boolean;
  size?: string;
};

export type BadgeProps = ComponentProps<BadgeParameters>;

export { default } from './badge';

import { ComponentProps } from '@uniformdev/canvas-next-rsc/component';
import { ContainerParameters } from '@/components/canvas/Container/parameters';

export type CardAdditionalProps = {
  className?: string;
  contentClassName?: string;
};

export type CardParameters = ContainerParameters;

export enum CardVariants {
  BackgroundImage = 'backgroundImage',
}

export enum CardSlots {
  CardMedia = 'cardMedia',
  CardContent = 'cardContent',
}

export type CardProps = ComponentProps<CardParameters & CardAdditionalProps, CardSlots>;

export { Card as default } from './card';
export { CardEmptyPlaceholder } from './empty-placeholder';

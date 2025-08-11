import { ContainerParameters } from '@/new-components/canvas/Container';
import { ComponentProps } from '@/types/canvasTypes';

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

export type CardProps = ComponentProps<CardParameters, CardSlots> & CardAdditionalProps;

export { default } from './card';
export { CardEmptyPlaceholder } from './empty-placeholder';

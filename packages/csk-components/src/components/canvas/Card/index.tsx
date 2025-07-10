import { ContainerParameters } from '@/components/canvas/Container/parameters';
import { ComponentProps } from '@/types/cskTypes';

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

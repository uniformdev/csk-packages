import dynamic from 'next/dynamic';
import { ContainerProps } from '@/components/ui/Container';

export enum ContentAlignment {
  Left = 'left',
  Center = 'center',
  Right = 'right',
}

export enum BannerVariants {
  None = '',
  Top = 'top',
  Bottom = 'bottom',
}

export type BannerProps = ContainerProps & {
  iconColor?: string;
  contentAlignment?: ContentAlignment;
  floating?: boolean;
  variant?: BannerVariants;
};

export type PositionClassesProps = {
  variant?: BannerVariants;
} & Pick<BannerProps, 'floating'>;

export type ContentClassesProps = Pick<BannerProps, 'floating' | 'iconColor' | 'fluidContent' | 'contentAlignment'>;

export default dynamic(() => import('./banner').then(mod => mod.default));

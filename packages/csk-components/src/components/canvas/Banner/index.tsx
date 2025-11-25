import { ContainerParameters } from '@/components/canvas/Container/parameters';
import { ContentAlignment } from '@/components/ui/Banner';
import { ComponentProps } from '@/types/cskTypes';

export enum BannerSlots {
  BannerContent = 'bannerContent',
}

export type BannerParameters = ContainerParameters & {
  iconColor?: string;
  contentAlignment?: ContentAlignment;
  floating?: boolean;
};

export type BannerProps = ComponentProps<BannerParameters, BannerSlots>;

export { ContentAlignment };

export { default } from './banner';

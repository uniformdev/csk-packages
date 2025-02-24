import dynamic from 'next/dynamic';
import { ComponentProps } from '@uniformdev/canvas-next-rsc/component';
import { ContainerParameters } from '@/components/canvas/Container/parameters';

export enum ContentAlignment {
  Left = 'left',
  Center = 'center',
  Right = 'right',
}

export type BannerParameters = ContainerParameters & {
  iconColor?: string;
  contentAlignment?: ContentAlignment;
  floating?: boolean;
};
export enum BannerSlots {
  BannerContent = 'bannerContent',
}

export type BannerProps = ComponentProps<BannerParameters, BannerSlots>;

export default dynamic(() => import('./banner').then(mod => mod.Banner));
export { BannerEmptyPlaceholder } from './empty-placeholder';

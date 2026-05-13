import dynamic from 'next/dynamic';
import type { AssetParamValue } from '@uniformdev/assets';
import type { LinkParamValue } from '@uniformdev/canvas';
import { TextParameters } from '@/components/canvas/Text/parameters';
import { ComponentProps, ViewPort } from '@/types/cskTypes';

export type NavigationMegaCategoryParameters = TextParameters & {
  icon?: AssetParamValue;
  caretIcon?: AssetParamValue;
  link?: LinkParamValue;
  backgroundColor?: string;
  border?: string | ViewPort<string>;
  hoverEffect?: string | ViewPort<string>;
  className?: string;
};

export enum NavigationMegaCategorySlots {
  CategoryPanel = 'categoryPanel',
}

export type NavigationMegaCategoryProps = ComponentProps<NavigationMegaCategoryParameters, NavigationMegaCategorySlots>;

export default dynamic(() => import('./navigation-mega-category-client').then(mod => mod.default));

export { NavigationMegaCategoryEmptyPlaceholder } from './empty-placeholder';

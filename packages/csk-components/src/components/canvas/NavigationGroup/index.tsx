import dynamic from 'next/dynamic';
import { AssetParamValue } from '@uniformdev/assets';
import { LinkParamValue } from '@uniformdev/canvas';
import { ComponentProps } from '@uniformdev/canvas-next-rsc/component';
import { TextParameters } from '@/components/canvas/Text/parameters';
import { ViewPort } from '@/types/cskTypes';

export type NavigationGroupParameters = TextParameters & {
  icon?: AssetParamValue;
  caretIcon?: AssetParamValue;
  link?: LinkParamValue;
  backgroundColor?: string;
  border?: string | ViewPort<string>;
  hoverEffect?: string | ViewPort<string>;
};

export enum NavigationGroupSlots {
  Links = 'links',
}

export type NavigationGroupProps = ComponentProps<NavigationGroupParameters, NavigationGroupSlots>;

export default dynamic(() => import('./navigation-group').then(mod => mod.NavigationGroup));
export { NavigationGroupEmptyPlaceholder } from './empty-placeholder';

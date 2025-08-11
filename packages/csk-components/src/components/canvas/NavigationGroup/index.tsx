import dynamic from 'next/dynamic';
import { AssetParamValue } from '@uniformdev/assets';
import { LinkParamValue } from '@uniformdev/canvas';
import { TextParameters } from '@/new-components/canvas/Text';
import { ComponentProps } from '@/types/canvasTypes';
import { ViewPort } from '@/types/cskTypes';

export type NavigationGroupParameters = TextParameters & {
  icon?: AssetParamValue;
  caretIcon?: AssetParamValue;
  link?: LinkParamValue;
  backgroundColor?: string;
  border?: string | ViewPort<string>;
  hoverEffect?: string | ViewPort<string>;
  className?: string;
};

export enum NavigationGroupSlots {
  Links = 'links',
}

export type NavigationGroupProps = ComponentProps<NavigationGroupParameters, NavigationGroupSlots>;

export default dynamic(() => import('./navigation-group').then(mod => mod.default));
export { NavigationGroupEmptyPlaceholder } from './empty-placeholder';

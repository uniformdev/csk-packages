import dynamic from 'next/dynamic';
import { Asset } from '@uniformdev/assets';
import { LinkParamValue } from '@uniformdev/canvas';
import { ComponentProps } from '@uniformdev/canvas-next-rsc/component';
import { TextParameters as BaseTextParameters } from '@uniformdev/csk-components/components/canvas';
import { withPlaygroundWrapper } from '@uniformdev/csk-components/hocs/withPlaygroundWrapper';
import { ViewPort } from '@uniformdev/csk-components/types/cskTypes';

export type NavigationGroupParameters = BaseTextParameters & {
  icon?: Asset[];
  link?: LinkParamValue;
  backgroundColor?: string;
  border?: string | ViewPort<string>;
};

export enum NavigationGroupSlots {
  Links = 'links',
}

export type NavigationGroupProps = ComponentProps<NavigationGroupParameters, NavigationGroupSlots>;

export default dynamic(() => import('./navigation-group').then(mod => withPlaygroundWrapper(mod.NavigationGroup)));
export { NavigationGroupEmptyPlaceholder } from './empty-placeholder';

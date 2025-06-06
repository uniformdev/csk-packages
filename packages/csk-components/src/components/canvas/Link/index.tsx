import { LinkParamValue } from '@uniformdev/canvas';
import { ComponentProps } from '@uniformdev/canvas-next-rsc/component';
import { Link } from './link';

export type LinkParameters = {
  displayName?: string;
  link?: LinkParamValue;
  openInNewTab?: boolean;
};

export enum LinkSlots {
  LinkContent = 'linkContent',
}

export type LinkProps = ComponentProps<LinkParameters, LinkSlots>;

export default Link;

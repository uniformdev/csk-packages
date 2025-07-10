import { LinkParamValue } from '@uniformdev/canvas';
import { ComponentProps } from '@/types/cskTypes';

export type LinkParameters = {
  displayName?: string;
  link?: LinkParamValue;
  openInNewTab?: boolean;
};

export enum LinkSlots {
  LinkContent = 'linkContent',
}

export type LinkProps = ComponentProps<LinkParameters, LinkSlots>;

export { default } from './link';

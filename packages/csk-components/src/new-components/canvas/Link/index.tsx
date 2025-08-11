import { LinkParamValue } from '@uniformdev/canvas';

export type LinkParameters = {
  displayName?: string;
  link?: LinkParamValue;
  openInNewTab?: boolean;
};

export enum LinkSlots {
  LinkContent = 'linkContent',
}

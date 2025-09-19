import { AssetParamValue, LinkParamValue } from '@uniformdev/canvas';
import { ComponentProps } from '@/types/cskTypes';

export type SimpleHeaderParameters = {
  logo?: AssetParamValue;
  color?: string;
  links?: {
    title: string;
    link: LinkParamValue;
  }[];
  backgroundColor?: string;
  textColor?: string;
  hoverTextColor?: string;
};

export enum SimpleHeaderVariants {
  Sticky = 'sticky',
}

export type SimpleHeaderProps = ComponentProps<SimpleHeaderParameters>;

export { default } from './simple-header';

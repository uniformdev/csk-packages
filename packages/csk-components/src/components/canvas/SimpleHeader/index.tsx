import { AssetParamValue, LinkParamValue } from '@uniformdev/canvas';
import { ComponentProps } from '@/types/cskTypes';

export type SimpleHeaderParameters = {
  logo?: AssetParamValue;
  color?: string;
  link1Title?: string;
  link1Link?: LinkParamValue;
  link2Title?: string;
  link2Link?: LinkParamValue;
};

export enum SimpleHeaderVariants {
  Sticky = 'sticky',
}

export type SimpleHeaderProps = ComponentProps<SimpleHeaderParameters>;

export { default } from './simple-header';

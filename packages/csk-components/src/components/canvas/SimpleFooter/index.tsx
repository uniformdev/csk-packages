import { AssetParamValue, RichTextParamValue } from '@uniformdev/canvas';
import { ComponentProps } from '@/types/cskTypes';

export type SimpleFooterParameters = {
  logo?: AssetParamValue;
  copyright?: RichTextParamValue;
  content?: RichTextParamValue;
};

export type SimpleFooterProps = ComponentProps<SimpleFooterParameters>;

export { default } from './simple-footer';

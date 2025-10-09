import { AssetParamValue, LinkParamValue, RichTextParamValue } from '@uniformdev/canvas';
import { ComponentProps } from '@/types/cskTypes';

export type SimpleFooterParameters = {
  logo?: AssetParamValue;
  copyright?: RichTextParamValue;
  footerLinkSectionTitle?: string;
  links?: {
    title: string;
    link: LinkParamValue;
  }[];
};

export type SimpleFooterProps = ComponentProps<SimpleFooterParameters>;

export { default } from './simple-footer';

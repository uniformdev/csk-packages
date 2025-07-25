import { RichTextNode } from '@uniformdev/richtext';
import { ComponentProps } from '@/types/cskTypes';

export type RichTextAdditionalProps = {
  className?: string;
};

export type RichTextParameters = {
  text?: RichTextNode;
  color?: string;
  font?: string;
  lineCountRestrictions?: string;
};

export { default } from './rich-text';
export type RichTextProps = ComponentProps<RichTextParameters> & RichTextAdditionalProps;

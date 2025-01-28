import { ComponentProps } from '@uniformdev/canvas-next-rsc/component';
import { RichTextNode } from '@uniformdev/richtext';
import { withPlaygroundWrapper } from '@uniformdev/theme-pack/hocs/withPlaygroundWrapper';
import { RichText } from './rich-text';

export type RichTextAdditionalProps = {
  className?: string;
};

export type RichTextParameters = {
  text?: RichTextNode;
  color?: string;
  font?: string;
  lineCountRestrictions: string;
};

export type RichTextProps = ComponentProps<RichTextParameters & RichTextAdditionalProps>;

export default withPlaygroundWrapper(RichText);

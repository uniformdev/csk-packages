import { ComponentProps } from '@uniformdev/canvas-next-rsc/component';
import { withPlaygroundWrapper } from '@uniformdev/csk-components/hocs/withPlaygroundWrapper';
import { RichTextNode } from '@uniformdev/richtext';
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

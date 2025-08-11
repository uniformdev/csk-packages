import { ComponentProps } from '@uniformdev/canvas-react';
import { RichTextParameters } from '@/new-components/canvas/RichText';

export type RichTextAdditionalProps = {
  className?: string;
};

export type RichTextProps = ComponentProps<RichTextParameters> & RichTextAdditionalProps;
export { default } from './rich-text';

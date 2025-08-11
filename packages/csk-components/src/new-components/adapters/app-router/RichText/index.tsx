import { RichTextParameters } from '@/new-components/canvas/RichText';
import { ComponentProps } from '@/types/canvasTypes';

export type RichTextAdditionalProps = {
  className?: string;
};

export type RichTextProps = ComponentProps<RichTextParameters> & RichTextAdditionalProps;
export { default } from './rich-text';

import { ComponentProps } from '@uniformdev/canvas-next-rsc/component';
import { TextProps as BaseTextProps } from '@uniformdev/csk-components/components/ui';
import { withPlaygroundWrapper } from '@uniformdev/csk-components/hocs/withPlaygroundWrapper';
import { Text } from './text';

export type TextParameters = {
  text?: string;
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span';
  size?: BaseTextProps['size'];
  color?: string;
  weight?: BaseTextProps['weight'];
  font?: string;
  alignment?: BaseTextProps['alignment'];
  transform?: BaseTextProps['transform'];
  decoration?: BaseTextProps['decoration'];
  letterSpacing?: BaseTextProps['letterSpacing'];
  lineCountRestrictions?: string;
};

export type TextProps = ComponentProps<TextParameters>;

export default withPlaygroundWrapper(Text);

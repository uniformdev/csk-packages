import { TextProps as BaseTextProps } from '@uniformdev/csk-components/components/ui';
import { ComponentProps } from '@uniformdev/csk-components/types/cskTypes';

export type TextParameters = {
  price?: number;
  currency?: string;
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

export type FormattedPriceProps = ComponentProps<TextParameters>;

export { default } from './formattedPrice';

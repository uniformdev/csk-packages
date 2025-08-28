import { FC } from 'react';
import { ComponentProps } from '@uniformdev/canvas-react';
import { TextParameters as BaseTextParameters } from '@uniformdev/csk-components/components/canvas';
import { Text as BaseText } from '@uniformdev/csk-components/components/ui';

type TextParameters = Pick<
  BaseTextParameters,
  'size' | 'weight' | 'alignment' | 'transform' | 'decoration' | 'letterSpacing' | 'lineCountRestrictions'
> & {
  price?: number;
  currency?: string;
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span';
  color?: string;
  font?: string;
};

type FormattedPriceProps = ComponentProps<TextParameters>;

const FormattedPrice: FC<FormattedPriceProps> = ({
  price,
  currency,
  size,
  tag,
  color,
  weight,
  font,
  transform,
  decoration,
  letterSpacing,
  lineCountRestrictions,
  alignment,
}) => {
  const Tag = tag || 'span';

  if (!price || !currency) {
    return null;
  }

  const formattedPrice = new Intl.NumberFormat('en-US', { style: 'currency', currency: currency || 'USD' }).format(
    price
  );
  return (
    <BaseText
      {...{ color, size, font, weight, transform, decoration, letterSpacing, alignment, lineCountRestrictions }}
    >
      <Tag>{formattedPrice}</Tag>
    </BaseText>
  );
};

export default FormattedPrice;

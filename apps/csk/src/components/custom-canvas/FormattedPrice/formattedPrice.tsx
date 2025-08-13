import { FC } from 'react';
import { Text as BaseText } from '@uniformdev/csk-components/components/ui';
import { withFlattenParameters } from '@uniformdev/csk-components/utils/withFlattenParameters';
import { FormattedPriceProps, TextParameters } from '.';

const FormattedPrice: FC<FormattedPriceProps & TextParameters> = ({
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

export default withFlattenParameters(FormattedPrice);

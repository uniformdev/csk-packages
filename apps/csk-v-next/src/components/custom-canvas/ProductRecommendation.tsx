import { FC } from 'react';
import { ComponentProps, UniformSlot } from '@uniformdev/canvas-next-rsc/component';

enum ProductRecommendationSlots {
  Products = 'products',
}

const ProductRecommendation: FC<ComponentProps<Record<string, unknown>, ProductRecommendationSlots>> = ({
  component,
  context,
  slots,
}) => (
  <div className="flex flex-row flex-wrap gap-4 *:*:h-full *:w-[300px]">
    <UniformSlot data={component} context={context} slot={slots.products} />
  </div>
);

export default ProductRecommendation;

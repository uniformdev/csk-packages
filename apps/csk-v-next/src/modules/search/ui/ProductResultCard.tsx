import { FC } from 'react';
import { ProductCard } from '@/components/custom-ui/ProductCard';
import { ContentType, WithUniformContentEntrySystemParams, Product } from '../types';

export type ProductCardProps = WithUniformContentEntrySystemParams<Product> & {
  contentType: ContentType.Product;
  textColor?: string;
  border?: string;
};

const ProductResultCard: FC<ProductCardProps> = ({ title, primaryImage, slug, variants, textColor, rating }) => {
  const asset = primaryImage?.[0];

  const { price = 0, currency = 'USD' } = variants?.[0] ?? {};

  return (
    <ProductCard
      image={asset?.url}
      title={title}
      price={price}
      currency={currency}
      textColor={textColor ?? ''}
      slug={slug}
      link={`/products/${slug}`}
      rating={rating}
    />
  );
};

export default ProductResultCard;

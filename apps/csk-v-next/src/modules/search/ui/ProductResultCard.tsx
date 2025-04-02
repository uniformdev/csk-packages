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

  const price = variants?.[0]?.price;
  const currency = variants?.[0]?.currency;

  return (
    <ProductCard
      image={asset?.url}
      title={title}
      price={`${price}${currency}`}
      textColor={textColor ?? ''}
      slug={slug}
      link={`/products/${slug}`}
      rating={rating}
    />
  );
};

export default ProductResultCard;

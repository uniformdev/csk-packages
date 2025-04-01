import { FC } from 'react';
import { ProductCard } from '@/components/custom-ui/ProductCard';
import { ContentType, WithUniformContentEntrySystemParams, Product } from '../types';

export type ProductCardProps = WithUniformContentEntrySystemParams<Product> & {
  contentType: ContentType.Product;
  textColor?: string;
  border?: string;
};

const ProductResultCard: FC<ProductCardProps> = ({ title, primaryImage, slug, variants, textColor }) => {
  const asset = primaryImage[0];
  if (!asset) return null;

  const price = variants[0].price;
  const currency = variants[0].currency;

  return (
    <ProductCard
      image={asset.url}
      title={title}
      price={`${price}${currency}`}
      textColor={textColor ?? ''}
      slug={slug}
      link={`/products/${slug}`}
    />
  );
};

export default ProductResultCard;

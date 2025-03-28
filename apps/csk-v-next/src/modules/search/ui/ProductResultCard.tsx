import { FC } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@uniformdev/csk-components/utils/styling';
import { ContentType, WithUniformContentEntrySystemParams, Product } from '../types';
import scaleWidthAndHeightWithAspectRatio from '../utils/scaleWidthAndHeightWithAspectRatio';

export type ProductCardProps = WithUniformContentEntrySystemParams<Product> & {
  contentType: ContentType.Product;
  textColor?: string;
  border?: string;
};

const ProductResultCard: FC<ProductCardProps> = ({
  title,
  primaryImage,
  shortDescription,
  slug,
  textColor,
  border,
}) => {
  const asset = primaryImage[0];
  if (!asset) return null;

  const { width, height } = scaleWidthAndHeightWithAspectRatio({
    width: asset.width,
    height: asset.height,
    maxWidth: 500,
  });
  return (
    <Link
      href={`/products/${slug}`}
      className={cn('flex flex-col gap-y-2', {
        [`text-${textColor}`]: textColor,
        [`border-${border}`]: border,
      })}
    >
      <Image className="aspect-video object-cover" src={asset.url} alt={title} width={width} height={height} />
      <p className="text-2xl font-bold">{title}</p>
      {shortDescription && <p className="text-sm">{shortDescription}</p>}
    </Link>
  );
};

export default ProductResultCard;

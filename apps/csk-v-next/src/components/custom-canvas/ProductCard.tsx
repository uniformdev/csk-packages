import { FC } from 'react';
import { Asset } from '@uniformdev/assets';
import { LinkParamValue } from '@uniformdev/canvas';
import { ComponentProps, UniformText } from '@uniformdev/canvas-next-rsc/component';
import { resolveAsset } from '@uniformdev/csk-components/utils/assets';
import { formatUniformLink } from '@uniformdev/csk-components/utils/routing';
import { ProductCard as BaseProductCard } from '@/components/custom-ui/ProductCard';

type ProductCardProps = ComponentProps<{
  image: Asset[];
  link: LinkParamValue;
  title: string;
  price: number;
  slug: string;
  textColor: string;
  addToFavoritesIcon: Asset[];
  removeFromFavoritesIcon: Asset[];
  rating: number;
}>;

const ProductCard: FC<ProductCardProps> = ({
  context,
  component,
  image,
  link,
  slug,
  textColor,
  addToFavoritesIcon,
  removeFromFavoritesIcon,
  rating,
}) => {
  const [resolvedImage] = resolveAsset(image);

  const href = formatUniformLink(link);

  const [resolvedAddToFavoritesIcon] = resolveAsset(addToFavoritesIcon);
  const [resolvedRemoveFromFavoritesIcon] = resolveAsset(removeFromFavoritesIcon);

  return (
    <BaseProductCard
      image={resolvedImage?.url}
      title={<UniformText component={component} parameterId="title" context={context} />}
      price={<UniformText component={component} parameterId="price" context={context} />}
      slug={slug}
      link={href}
      textColor={textColor}
      addToFavoritesIcon={resolvedAddToFavoritesIcon?.url}
      removeFromFavoritesIcon={resolvedRemoveFromFavoritesIcon?.url}
      rating={rating}
    />
  );
};

export default ProductCard;

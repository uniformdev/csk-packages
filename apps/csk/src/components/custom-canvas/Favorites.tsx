import { FC } from 'react';
import { AssetParamValue } from '@uniformdev/assets';
import { ComponentProps, UniformSlot } from '@uniformdev/canvas-react';
import { Grid } from '@uniformdev/csk-components/components/ui';
import { resolveAsset } from '@uniformdev/csk-components/utils/assets';
import { cn } from '@uniformdev/csk-components/utils/styling';
import ProductCard, { ProductCardSkeleton } from '@/components/custom-ui/ProductCard';
import { useFavorites } from '@/providers/FavoritesProvider';

type FavoritesSkeletonProps = {
  count?: number;
};

const FavoritesSkeleton: FC<FavoritesSkeletonProps> = ({ count = 6 }) => {
  return (
    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 md:pt-14 lg:mb-8">
      {Array.from({ length: count }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  );
};

enum FavoritesSlots {
  EmptyFavoritesContent = 'emptyFavoritesContent',
}

type FavoritesParameters = {
  primaryTextColor?: string;
  addToFavoritesIcon?: AssetParamValue;
  removeFromFavoritesIcon?: AssetParamValue;
};

type FavoritesProps = ComponentProps<FavoritesParameters>;

const Favorites: FC<FavoritesProps> = ({ primaryTextColor, addToFavoritesIcon, removeFromFavoritesIcon }) => {
  const { favoritesProducts, isFavoritesLoading, storedFavorites } = useFavorites();

  const hasItems = Boolean(favoritesProducts.length);

  if (isFavoritesLoading && !hasItems) {
    return <FavoritesSkeleton />;
  }

  const [resolvedAddToFavoritesIcon] = resolveAsset(addToFavoritesIcon);
  const [resolvedRemoveFromFavoritesIcon] = resolveAsset(removeFromFavoritesIcon);

  return (
    <div
      className={cn('md:pt-14 lg:mb-8', {
        [`text-${primaryTextColor}`]: !!primaryTextColor,
      })}
    >
      {hasItems ? (
        <Grid columnsCount={'3'} gapY="8" gapX="8">
          {favoritesProducts.map(product => {
            const isFavorite = storedFavorites[product.slug];

            if (!isFavorite) {
              return <ProductCardSkeleton key={product.slug} />;
            }

            const { price = 0, currency = 'USD' } = product?.variants?.[0] ?? {};
            return (
              <ProductCard
                key={product.slug}
                price={price}
                currency={currency}
                title={product.title}
                image={product.primaryImage?.[0]?.url}
                slug={product.slug}
                link={`/products/${product.slug}`}
                textColor={primaryTextColor}
                addToFavoritesIcon={resolvedAddToFavoritesIcon?.url}
                removeFromFavoritesIcon={resolvedRemoveFromFavoritesIcon?.url}
              />
            );
          })}
        </Grid>
      ) : (
        <UniformSlot name={FavoritesSlots.EmptyFavoritesContent} />
      )}
    </div>
  );
};

export default Favorites;

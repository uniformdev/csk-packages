'use client';

import { FC } from 'react';
import { Asset } from '@uniformdev/assets';
import {
  NavigationLink as CSKNavigationLink,
  NavigationLinkProps as CSKNavigationLinkProps,
} from '@uniformdev/csk-components/components/canvas';
import { FavoritesIconSkeleton, useFavorites } from '@/modules/favorites';

type FavoritesIconProps = Omit<CSKNavigationLinkProps, 'icon'> & {
  emptyFavoritesIcon: Asset[];
  filledFavoritesIcon: Asset[];
};

const FavoritesIcon: FC<FavoritesIconProps> = ({ filledFavoritesIcon, emptyFavoritesIcon, ...props }) => {
  const { isFavoritesLoading, storedFavorites } = useFavorites();

  const hasItems = Boolean(Object.keys(storedFavorites).length);

  if (isFavoritesLoading && !hasItems) {
    return <FavoritesIconSkeleton />;
  }

  const icon = hasItems ? filledFavoritesIcon : emptyFavoritesIcon;

  return (
    <div className="relative">
      <CSKNavigationLink icon={icon} {...props} />
    </div>
  );
};

export default FavoritesIcon;

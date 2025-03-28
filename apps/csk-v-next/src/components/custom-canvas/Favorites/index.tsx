'use client';

import { FC } from 'react';
import dynamic from 'next/dynamic';
import { Asset } from '@uniformdev/assets';
import { ComponentProps } from '@uniformdev/canvas-next-rsc/component';
import { FavoritesSkeleton } from '@/modules/favorites';

const FavoritesClient = dynamic(() => import('./favorites').then(mod => mod.default), {
  ssr: false,
  loading: () => <FavoritesSkeleton />,
});

enum FavoritesSlots {
  EmptyFavoritesContent = 'emptyFavoritesContent',
}

type FavoritesParameters = {
  primaryTextColor: string;
  addToFavoritesIcon: Asset[];
  removeFromFavoritesIcon: Asset[];
};

type FavoritesProps = ComponentProps<FavoritesParameters, FavoritesSlots>;
const Favorites: FC<FavoritesProps> = props => <FavoritesClient {...props} />;

export default Favorites;

'use client';

import { FC } from 'react';
import { Image } from '@uniformdev/csk-components/components/ui';
import { useFavorites } from '@/modules/favorites/providers/FavoritesProvider';

export type AddToFavoritesProps = {
  addIcon: string;
  removeIcon: string;
  productSlug: string;
};

export const AddToFavorites: FC<AddToFavoritesProps> = ({ addIcon, removeIcon, productSlug }) => {
  const { storedFavorites, toggleFavorite } = useFavorites();

  const isInFavorites = storedFavorites[productSlug];

  const iconToRender = isInFavorites ? removeIcon : addIcon;

  const label = isInFavorites ? 'Remove from favorites' : 'Add to favorites';

  const toggleFavorites = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    toggleFavorite(productSlug);
  };

  return (
    <button aria-label={label} className="relative size-[1.5em] hover:scale-110" onClick={toggleFavorites}>
      <Image src={iconToRender} fill alt={label} />
    </button>
  );
};

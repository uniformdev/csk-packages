'use client';

import { createContext, useContext, FC, PropsWithChildren, useMemo, useCallback, useState, useEffect } from 'react';
import useStorage from '@/hooks/useStorage';
import { FAVORITES_STORAGE_KEY } from '../constants';
import { Product } from '../types';

type FavoritesContextType = {
  storedFavorites: string[];
  toggleFavorite: (productSlug: string) => void;
  favoritesProducts: Product[];
  isFavoritesLoading: boolean;
};

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const FavoritesProvider: FC<PropsWithChildren> = ({ children }) => {
  const [storedFavorites, setStoredFavorites] = useStorage<string[]>(FAVORITES_STORAGE_KEY, []);
  const [isFavoritesLoading, setIsFavoritesLoading] = useState(false);
  const [favoritesProducts, setFavoritesProducts] = useState<Product[]>([]);

  const toggleFavorite = useCallback(
    (productSlug: string) => {
      if (storedFavorites.includes(productSlug)) {
        const newFavorites = storedFavorites.filter(slug => slug !== productSlug);
        setStoredFavorites(newFavorites);
      } else {
        const newFavorites = [...storedFavorites, productSlug];
        setStoredFavorites(newFavorites);
      }
    },
    [setStoredFavorites, storedFavorites]
  );

  useEffect(() => {
    const fetchFavorites = async () => {
      setIsFavoritesLoading(true);
      const productSlugs = storedFavorites;
      const query = productSlugs.map(slug => `productSlugs=${encodeURIComponent(slug)}`).join('&');
      const response = await fetch(`/api/user/cart?${query}`);

      const data = await response.json();

      setFavoritesProducts(data);
      setIsFavoritesLoading(false);
    };

    fetchFavorites();
  }, [storedFavorites]);

  const value = useMemo(
    () => ({
      storedFavorites,
      toggleFavorite,
      favoritesProducts,
      isFavoritesLoading,
    }),
    [storedFavorites, toggleFavorite, favoritesProducts, isFavoritesLoading]
  );

  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>;
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};

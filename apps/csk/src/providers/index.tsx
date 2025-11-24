'use client';

import { ReactNode } from 'react';
import { CardProvider } from './CardProvider';
import { FavoritesProvider } from './FavoritesProvider';

const CoffeeShopProvider = ({ children }: { children: ReactNode }) => (
  <CardProvider>
    <FavoritesProvider>{children}</FavoritesProvider>
  </CardProvider>
);

export default CoffeeShopProvider;

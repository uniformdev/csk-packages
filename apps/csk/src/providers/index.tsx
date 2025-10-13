import { CardProvider } from './CardProvider';
import { FavoritesProvider } from './FavoritesProvider';

export const CoffeeShopProvider = ({ children }: { children: React.ReactNode }) => (
  <CardProvider>
    <FavoritesProvider>{children}</FavoritesProvider>
  </CardProvider>
);

'use client';

import { createContext, useContext, FC, PropsWithChildren, useMemo, useCallback, useEffect, useState } from 'react';
import { CART_STORAGE_KEY } from './constants';
import { Product, StoredCart } from './types';
import useStorage from './useStorage';

type CardContextType = {
  storedCart: StoredCart;
  cartProducts: Product[];
  addToCard: (productSlug: string, quantity: number) => void;
  removeFromCard: (productSlug: string) => void;
  updateCard: (productSlug: string, quantity: number) => void;
};

const CardContext = createContext<CardContextType | undefined>(undefined);

export const CardProvider: FC<PropsWithChildren> = ({ children }) => {
  const [storedCart, setStoredCart] = useStorage<StoredCart>(CART_STORAGE_KEY, {});
  const [cartProducts, setCartProducts] = useState<Product[]>([]);

  const addToCard = useCallback(
    (productSlug: string, quantity: number) => {
      const productFromCart = storedCart[productSlug];

      const updatedProduct = productFromCart
        ? { ...productFromCart, quantity: productFromCart.quantity + quantity }
        : { productSlug, quantity };

      const updatedCart = { ...storedCart, [productSlug]: updatedProduct };

      setStoredCart(updatedCart);
    },
    [storedCart, setStoredCart]
  );

  const updateCard = useCallback(
    (productSlug: string, quantity: number) => {
      const productFromCart = storedCart[productSlug];

      const updatedProduct = productFromCart ? { ...productFromCart, quantity: quantity } : { productSlug, quantity };

      const updatedCart = { ...storedCart, [productSlug]: updatedProduct };

      setStoredCart(updatedCart);
    },
    [storedCart, setStoredCart]
  );

  const removeFromCard = useCallback(
    (productSlug: string) => {
      const { [productSlug]: _, ...updatedCart } = storedCart;

      setStoredCart(updatedCart);
    },
    [storedCart, setStoredCart]
  );

  useEffect(() => {
    const fetchCart = async () => {
      const productSlugs = Object.keys(storedCart);
      const query = productSlugs.map(slug => `productSlugs=${encodeURIComponent(slug)}`).join('&');
      const response = await fetch(`/api/user/cart?${query}`);

      const data = await response.json();

      setCartProducts(data);
    };

    fetchCart();
  }, [storedCart]);

  const value = useMemo(
    () => ({ storedCart, cartProducts, addToCard, removeFromCard, updateCard }),
    [storedCart, cartProducts, addToCard, removeFromCard, updateCard]
  );

  return <CardContext.Provider value={value}>{children}</CardContext.Provider>;
};

export const useCard = () => {
  const context = useContext(CardContext);
  if (context === undefined) {
    throw new Error('useCard must be used within a CardProvider');
  }
  return context;
};

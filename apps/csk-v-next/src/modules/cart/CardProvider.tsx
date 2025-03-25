'use client';

import { createContext, useContext, FC, PropsWithChildren, useMemo, useCallback, useEffect, useState } from 'react';
import { getCookie, setCookie } from 'cookies-next';
import { USER_ID_COOKIE_NAME } from './constants';
import { StoredCart } from './types';

type CardContextType = {
  storedCart: StoredCart;
  addToCard: (productSlug: string, quantity: number) => void;
  removeFromCard: (productSlug: string) => void;
  updateCard: (productSlug: string, quantity: number) => void;
};

const CardContext = createContext<CardContextType | undefined>(undefined);

export const CardProvider: FC<PropsWithChildren> = ({ children }) => {
  const [storedCart, setStoredCart] = useState<StoredCart>({});

  const updateRemoteCart = useCallback(async (cart: StoredCart) => {
    const userId = getCookie(USER_ID_COOKIE_NAME);

    const updateCardResponse = await fetch('/api/user/cart', {
      method: 'POST',
      body: JSON.stringify({ cart, userId }),
    });

    const updateCardResponseData = await updateCardResponse.json();

    const { data } = updateCardResponseData;

    const { user } = data;

    setCookie(USER_ID_COOKIE_NAME, user);
  }, []);

  const addToCard = useCallback(
    (productSlug: string, quantity: number) => {
      const productFromCart = storedCart[productSlug];

      const updatedProduct = productFromCart
        ? { ...productFromCart, quantity: productFromCart.quantity + quantity }
        : { productSlug, quantity };

      const updatedCart = { ...storedCart, [productSlug]: updatedProduct };

      setStoredCart(updatedCart);
      updateRemoteCart(updatedCart);
    },
    [storedCart, updateRemoteCart]
  );

  const updateCard = useCallback(
    (productSlug: string, quantity: number) => {
      const productFromCart = storedCart[productSlug];

      const updatedProduct = productFromCart ? { ...productFromCart, quantity: quantity } : { productSlug, quantity };

      const updatedCart = { ...storedCart, [productSlug]: updatedProduct };

      setStoredCart(updatedCart);
      updateRemoteCart(updatedCart);
    },
    [storedCart, updateRemoteCart]
  );

  const removeFromCard = useCallback(
    (productSlug: string) => {
      const { [productSlug]: _, ...updatedCart } = storedCart;

      setStoredCart(updatedCart);
      updateRemoteCart(updatedCart);
    },
    [storedCart, updateRemoteCart]
  );

  useEffect(() => {
    const userId = getCookie(USER_ID_COOKIE_NAME);

    if (userId) {
      fetch(`/api/user/cart?userId=${userId}`, {
        method: 'GET',
      })
        .then(res => res.json())
        .then(({ data }) => {
          const { cart } = data;
          setStoredCart(cart);
        });
    }
  }, []);

  const value = useMemo(
    () => ({ storedCart, addToCard, removeFromCard, updateCard }),
    [storedCart, addToCard, removeFromCard, updateCard]
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

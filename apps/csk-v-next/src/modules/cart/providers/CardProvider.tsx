'use client';

import { createContext, useContext, FC, PropsWithChildren, useMemo, useCallback, useEffect, useState } from 'react';
import { CART_STORAGE_KEY } from '../constants';
import useStorage from '../hooks/useStorage';
import { Product, StoredCart } from '../types';
import ShoppingCartModal from '../ui/ShoppingCartModal';

type CardContextType = {
  storedCart: StoredCart;
  cartProducts: Product[];
  addToCard: (productSlug: string, quantity: number) => void;
  removeFromCard: (productSlug: string) => void;
  updateCard: (productSlug: string, quantity: number) => void;
  total: number;
  isCartLoading: boolean;
  isModalCartOpen: boolean;
  setIsModalCartOpen: (isModalCartOpen: boolean) => void;
};

const CardContext = createContext<CardContextType | undefined>(undefined);

export const CardProvider: FC<PropsWithChildren> = ({ children }) => {
  const [storedCart, setStoredCart] = useStorage<StoredCart>(CART_STORAGE_KEY, {});
  const [cartProducts, setCartProducts] = useState<Product[]>([]);
  const [isCartLoading, setIsCartLoading] = useState(false);
  const [isModalCartOpen, setIsModalCartOpen] = useState(false);

  const addToCard = useCallback(
    (productSlug: string, quantity: number) => {
      const productFromCart = storedCart[productSlug];

      const updatedProduct = productFromCart
        ? { ...productFromCart, quantity: productFromCart.quantity + quantity }
        : { productSlug, quantity };

      const updatedCart = { ...storedCart, [productSlug]: updatedProduct };

      setStoredCart(updatedCart);

      if (!isModalCartOpen) {
        setIsModalCartOpen(true);
      }
    },
    [storedCart, setStoredCart, isModalCartOpen, setIsModalCartOpen]
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

      setStoredCart(updatedCart, { force: true });
    },
    [storedCart, setStoredCart]
  );

  const total = useMemo(() => {
    const cartTotal = cartProducts.reduce((acc, product) => {
      const productFromCart = storedCart[product.slug];

      if (!productFromCart) return acc;

      return acc + product.variants?.[0].price * productFromCart?.quantity;
    }, 0);

    return Math.round(cartTotal * 100) / 100;
  }, [storedCart, cartProducts]);

  useEffect(() => {
    const fetchCart = async () => {
      setIsCartLoading(true);
      const productSlugs = Object.keys(storedCart);
      const query = productSlugs.map(slug => `productSlugs=${encodeURIComponent(slug)}`).join('&');
      const response = await fetch(`/api/user/cart?${query}`);

      const data = await response.json();

      setCartProducts(data);
      setIsCartLoading(false);
    };

    fetchCart();
  }, [storedCart]);

  const value = useMemo(
    () => ({
      storedCart,
      cartProducts,
      addToCard,
      removeFromCard,
      updateCard,
      total,
      isCartLoading,
      isModalCartOpen,
      setIsModalCartOpen,
    }),
    [
      storedCart,
      cartProducts,
      addToCard,
      removeFromCard,
      updateCard,
      total,
      isCartLoading,
      isModalCartOpen,
      setIsModalCartOpen,
    ]
  );

  return (
    <CardContext.Provider value={value}>
      {children}
      <ShoppingCartModal />
    </CardContext.Provider>
  );
};

export const useCard = () => {
  const context = useContext(CardContext);
  if (context === undefined) {
    throw new Error('useCard must be used within a CardProvider');
  }
  return context;
};

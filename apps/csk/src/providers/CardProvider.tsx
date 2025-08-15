'use client';

import { createContext, useContext, FC, PropsWithChildren, useMemo, useCallback, useEffect, useState } from 'react';
import { useUniformContext } from '@uniformdev/canvas-next-rsc-v2/component';
import ShoppingCartModal from '@/components/custom-ui/ShoppingCartModal';
import { CART_STORAGE_KEY } from '@/constants';
import useStorage from '@/hooks/useStorage';
import { Product, StoredCart } from '@/types';

type ModalProps = {
  modalCloseTitle?: string;
  modalCheckoutTitle?: string;
  modalSubtotalTitle?: string;
  modalQuantityTitle?: string;
  modalPriceTitle?: string;
  modalMyCartTitle?: string;
  modalItemTitle?: string;
  modalRemoveTitle?: string;
  modalCurrencySymbol?: string;
};

type CardContextType = {
  storedCart: StoredCart;
  cartProducts: Product[];
  addToCard: (productSlug: string, quantity: number, openMiniCart?: boolean) => void;
  removeFromCard: (productSlug: string) => void;
  updateCard: (productSlug: string, quantity: number) => void;
  total: number;
  totalQuantity: number;
  isCartLoading: boolean;
  isModalCartOpen: boolean;
  setIsModalCartOpen: (isModalCartOpen: boolean) => void;
  modalProps: ModalProps;
  setModalProps: (modalProps: ModalProps) => void;
};

const CardContext = createContext<CardContextType | undefined>(undefined);

export const CardProvider: FC<PropsWithChildren> = ({ children }) => {
  const { context } = useUniformContext();

  const [storedCart, setStoredCart] = useStorage<StoredCart>(CART_STORAGE_KEY, {});
  const [cartProducts, setCartProducts] = useState<Product[]>([]);
  const [isCartLoading, setIsCartLoading] = useState(false);
  const [isModalCartOpen, setIsModalCartOpen] = useState(false);
  const [modalProps, setModalProps] = useState<ModalProps>({
    modalCloseTitle: 'Close',
    modalCheckoutTitle: 'Checkout',
    modalSubtotalTitle: 'Subtotal',
    modalQuantityTitle: 'Quantity',
    modalPriceTitle: 'Price',
    modalMyCartTitle: 'My Cart',
    modalItemTitle: 'Item',
    modalRemoveTitle: 'Remove',
    modalCurrencySymbol: '$',
  });

  const addToCard = useCallback(
    (productSlug: string, quantity: number, openMiniCart?: boolean) => {
      const productFromCart = storedCart[productSlug];

      const updatedProduct = productFromCart
        ? { ...productFromCart, quantity: productFromCart.quantity + quantity }
        : { productSlug, quantity };

      const updatedCart = { ...storedCart, [productSlug]: updatedProduct };

      setStoredCart(updatedCart);

      if (!isModalCartOpen && openMiniCart) {
        setIsModalCartOpen(true);
      }
    },
    [storedCart, setStoredCart, isModalCartOpen, setIsModalCartOpen]
  );

  useEffect(() => {
    const isCartEmpty = Object.keys(storedCart).length === 0;

    context?.update({
      quirks: {
        isCartEmpty: isCartEmpty ? 'true' : 'false',
      },
    });
  }, [context, storedCart]);

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

  const totalQuantity = useMemo(
    () =>
      cartProducts.reduce((acc, product) => {
        const productFromCart = storedCart[product.slug];
        return acc + (productFromCart?.quantity || 0);
      }, 0),
    [storedCart, cartProducts]
  );

  useEffect(() => {
    const fetchCart = async () => {
      setIsCartLoading(true);
      const productSlugs = Object.keys(storedCart);
      const query = productSlugs.map(slug => `productSlugs=${encodeURIComponent(slug)}`).join('&');
      const response = await fetch(`/api/entry/by-slug?${query}`);

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
      totalQuantity,
      isCartLoading,
      isModalCartOpen,
      setIsModalCartOpen,
      modalProps,
      setModalProps,
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
      totalQuantity,
      modalProps,
      setModalProps,
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

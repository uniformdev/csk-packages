'use client';

import { FC } from 'react';
import dynamic from 'next/dynamic';
import { ComponentProps } from '@uniformdev/canvas-next-rsc/component';
import { ShoppingCartSkeleton } from '@/modules/cart';

const ShoppingCartClient = dynamic(() => import('./shopping-cart').then(mod => mod.default), {
  ssr: false,
  loading: () => <ShoppingCartSkeleton />,
});

enum ShoppingCartSlots {
  CheckoutButton = 'checkoutButton',
  EmptyCartContent = 'emptyCartContent',
}

type ShoppingCartParameters = {
  primaryTextColor?: string;
  secondaryTextColor?: string;
};

type ShoppingCartProps = ComponentProps<ShoppingCartParameters, ShoppingCartSlots>;

const ShoppingCart: FC<ShoppingCartProps> = props => <ShoppingCartClient {...props} />;

export default ShoppingCart;

'use client';

import { FC } from 'react';
import dynamic from 'next/dynamic';
import { ComponentProps } from '@uniformdev/canvas-next-rsc/component';
import { ShoppingCartSkeleton } from '@/modules/cart';

const ShoppingCartClient = dynamic(() => import('./ShoppingCartClient').then(mod => mod.default), {
  ssr: false,
  loading: () => <ShoppingCartSkeleton />,
});

enum ShoppingCartSlots {
  CheckoutButton = 'checkoutButton',
}

type ShoppingCartProps = ComponentProps<unknown, ShoppingCartSlots>;

const ShoppingCart: FC<ShoppingCartProps> = props => <ShoppingCartClient {...props} />;

export default ShoppingCart;

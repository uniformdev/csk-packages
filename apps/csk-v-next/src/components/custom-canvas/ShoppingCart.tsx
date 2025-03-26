'use client';

import { FC } from 'react';
import dynamic from 'next/dynamic';
import { ComponentProps } from '@uniformdev/canvas-next-rsc/component';
import ShoppingCartItemSkeleton from '../custom-ui/ShoppingCartItemSkeleton';
const ShoppingCartClient = dynamic(() => import('./ShoppingCartClient'), {
  ssr: false,
  loading: () => <ShoppingCartItemSkeleton />,
});

enum ShoppingCartSlots {
  Products = 'products',
}

type ShoppingCartProps = ComponentProps<unknown, ShoppingCartSlots>;

const ShoppingCart: FC<ShoppingCartProps> = props => <ShoppingCartClient {...props} />;

export default ShoppingCart;

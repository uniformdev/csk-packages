'use client';

import { FC } from 'react';
import dynamic from 'next/dynamic';
import { UniformSlot } from '@uniformdev/canvas-next-rsc-v2/component';
import { ComponentProps } from '@uniformdev/csk-components/types/cskTypes';
import { ShoppingCartSkeleton } from '@/components/custom-ui/ShoppingCart';

enum ShoppingCartSlots {
  CheckoutButton = 'checkoutButton',
  EmptyCartContent = 'emptyCartContent',
}

type ShoppingCartParameters = {
  primaryTextColor?: string;
  secondaryTextColor?: string;
};

export type ShoppingCartProps = ComponentProps<ShoppingCartParameters, ShoppingCartSlots>;

const ShoppingCartClient = dynamic(() => import('@/components/custom-ui/ShoppingCart').then(mod => mod.default), {
  ssr: false,
  loading: () => <ShoppingCartSkeleton />,
});

const ShoppingCart: FC<ShoppingCartProps & ShoppingCartParameters> = ({ slots, ...props }) => (
  <ShoppingCartClient
    {...props}
    emptyCartContent={<UniformSlot slot={slots.emptyCartContent} />}
    checkoutButton={<UniformSlot slot={slots.checkoutButton} />}
  />
);

export default ShoppingCart;

'use client';

import { FC } from 'react';
import {
  NavigationLink as CSKNavigationLink,
  NavigationLinkProps as CSKNavigationLinkProps,
} from '@uniformdev/csk-components/components/canvas';
import { ShoppingCartIconSkeleton, useCard } from '@/modules/cart';

type ShoppingCartIconProps = CSKNavigationLinkProps;

const ShoppingCartIcon: FC<ShoppingCartIconProps> = ({ ...props }) => {
  const { totalQuantity, isCartLoading, cartProducts } = useCard();

  const hasItems = Boolean(cartProducts.length);

  if (isCartLoading && !hasItems) {
    return <ShoppingCartIconSkeleton />;
  }

  return (
    <div className="relative">
      <CSKNavigationLink {...props} />
      {!!totalQuantity && (
        <div className="absolute -right-2 -top-2 flex size-4 items-center justify-center rounded-full bg-red-500">
          <span className="text-[10px] font-bold text-white">{totalQuantity}</span>
        </div>
      )}
    </div>
  );
};

export default ShoppingCartIcon;

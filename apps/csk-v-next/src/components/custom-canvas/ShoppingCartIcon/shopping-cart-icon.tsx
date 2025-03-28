'use client';

import { FC } from 'react';
import {
  NavigationLink as CSKNavigationLink,
  NavigationLinkProps as CSKNavigationLinkProps,
} from '@uniformdev/csk-components/components/canvas';
import { cn } from '@uniformdev/csk-components/utils/styling';
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
      <div
        className={cn(
          'absolute -right-2 -top-2 flex size-4 items-center justify-center rounded-full bg-red-500 text-white text-[10px] font-bold transition-all duration-300',
          totalQuantity ? 'opacity-100 scale-100 animate-fadeInBadge' : 'opacity-0 scale-75 pointer-events-none'
        )}
      >
        <span>{totalQuantity}</span>
      </div>
    </div>
  );
};

export default ShoppingCartIcon;

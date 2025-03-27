'use client';

import { FC, useCallback } from 'react';
import { ComponentProps, UniformSlot } from '@uniformdev/canvas-next-rsc/component';
import { cn } from '@uniformdev/csk-components/utils/styling';
import { ShoppingCartItem } from '@/modules/cart';
import { useCard } from '@/modules/cart';
import { ShoppingCartSkeleton } from '@/modules/cart/ui/skeleton/ShoppingCartSkeleton';

enum ShoppingCartSlots {
  CheckoutButton = 'checkoutButton',
  EmptyCartContent = 'emptyCartContent',
}

type ShoppingCartParameters = {
  primaryTextColor?: string;
  secondaryTextColor?: string;
};

type ShoppingCartProps = ComponentProps<ShoppingCartParameters, ShoppingCartSlots>;

const ShoppingCart: FC<ShoppingCartProps> = ({ component, context, slots, primaryTextColor, secondaryTextColor }) => {
  const { cartProducts, updateCard, removeFromCard, isCartLoading, total, storedCart } = useCard();
  const updateItemQuantity = useCallback(
    (productKey: string, newQuantity: number) => {
      updateCard(productKey, newQuantity);
    },
    [updateCard]
  );

  const removeItemFromCart = useCallback(
    (productKey: string) => {
      removeFromCard(productKey);
    },
    [removeFromCard]
  );

  const hasItems = Boolean(cartProducts.length);

  if (isCartLoading && !hasItems) {
    return <ShoppingCartSkeleton />;
  }

  return (
    <div
      className={cn('md:pt-14 lg:mb-8', {
        [`text-${primaryTextColor}`]: !!primaryTextColor,
      })}
    >
      {hasItems && (
        <div className="hidden flex-row border-b pb-4 font-bold md:flex">
          <div className="basis-3/5">ITEM</div>
          <div className="basis-1/5">QTY</div>
          <div className="basis-1/5 text-right">PRICE</div>
        </div>
      )}
      {hasItems ? (
        cartProducts.map(cartItem => {
          const productFromCart = storedCart[cartItem.slug];
          return (
            <ShoppingCartItem
              key={cartItem.slug}
              updateItemQuantity={updateItemQuantity}
              removeItemFromCart={removeItemFromCart}
              quantity={productFromCart?.quantity}
              product={cartItem}
              secondaryTextColor={secondaryTextColor}
            />
          );
        })
      ) : (
        <UniformSlot context={context} slot={slots.emptyCartContent} data={component} />
      )}
      {hasItems && (
        <div className="flex flex-col gap-4 pt-9">
          <div className="flex flex-row justify-end text-2xl font-bold">
            <span className="pr-4">Subtotal: </span>
            <span>${total}</span>
          </div>
          <div className="flex w-full justify-end">
            <UniformSlot context={context} slot={slots.checkoutButton} data={component} />
          </div>
        </div>
      )}
    </div>
  );
};

export default ShoppingCart;

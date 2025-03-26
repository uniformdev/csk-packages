'use client';

import { FC, useCallback } from 'react';
import Image from 'next/image';
import { ComponentProps, UniformSlot } from '@uniformdev/canvas-next-rsc/component';
import { ShoppingCartSkeleton, ShoppingCartItem } from '@/modules/cart';
import { useCard } from '@/modules/cart';
import InformationContent from '../custom-ui/InformationContent';

enum ShoppingCartSlots {
  CheckoutButton = 'checkoutButton',
}

type ShoppingCartProps = ComponentProps<unknown, ShoppingCartSlots>;

const ShoppingCart: FC<ShoppingCartProps> = ({ component, context, slots }) => {
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
    <div className="text-black md:pt-14 lg:mb-8">
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
            />
          );
        })
      ) : (
        <InformationContent
          title="Your shopping cart is empty"
          text="Products added to the cart will appear here."
          imageComponent={
            <Image
              src="https://res.cloudinary.com/uniform-demos/image/upload/v1692282886/csk-icons/icon-cart_zzou3e_yovtho.svg"
              width={75}
              height={75}
              alt="cart icon"
              unoptimized
            />
          }
        />
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

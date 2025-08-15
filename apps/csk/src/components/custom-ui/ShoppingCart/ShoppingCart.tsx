'use client';

import { FC, useCallback } from 'react';
import { cn } from '@uniformdev/csk-components/utils/styling';
import ShoppingCartItem, { ShoppingCartItemSkeleton } from '@/components/custom-ui/ShoppingCartItem';
import { useCard } from '@/providers/CardProvider';
import { ShoppingCartProps } from '.';
import { ShoppingCartSkeleton } from './skeleton';

const ShoppingCart: FC<ShoppingCartProps> = ({
  primaryTextColor,
  secondaryTextColor,
  emptyCartContent,
  checkoutButton,
}) => {
  const { cartProducts, updateCard, removeFromCard, isCartLoading, total, storedCart, modalProps } = useCard();
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

  const isNewItemsAddedToCard = isCartLoading && Object.keys(storedCart).length > cartProducts.length;

  if (isCartLoading && !hasItems) {
    return (
      <ShoppingCartSkeleton
        itemTitle={modalProps.modalItemTitle}
        quantityTitle={modalProps.modalQuantityTitle}
        priceTitle={modalProps.modalPriceTitle}
      />
    );
  }

  return (
    <div
      className={cn('md:pt-14 lg:mb-8', {
        [`text-${primaryTextColor}`]: !!primaryTextColor,
      })}
    >
      {hasItems && (
        <div className="hidden flex-row border-b pb-4 font-bold md:flex">
          <div className="basis-3/5">{modalProps.modalItemTitle}</div>
          <div className="basis-1/5">{modalProps.modalQuantityTitle}</div>
          <div className="basis-1/5 text-right">{modalProps.modalPriceTitle}</div>
        </div>
      )}
      {hasItems
        ? cartProducts.map(cartItem => {
            const productFromCart = storedCart[cartItem.slug];

            if (!productFromCart) {
              return <ShoppingCartItemSkeleton key={cartItem.slug} />;
            }

            return (
              <ShoppingCartItem
                key={cartItem.slug}
                updateItemQuantity={updateItemQuantity}
                removeItemFromCart={removeItemFromCart}
                quantity={productFromCart?.quantity}
                product={cartItem}
                secondaryTextColor={secondaryTextColor}
                removeTitle={modalProps.modalRemoveTitle}
                quantityTitle={modalProps.modalQuantityTitle}
                priceTitle={modalProps.modalPriceTitle}
                itemTitle={modalProps.modalItemTitle}
              />
            );
          })
        : emptyCartContent}
      {isNewItemsAddedToCard && <ShoppingCartItemSkeleton />}
      {hasItems && (
        <div className="flex flex-col gap-4 pt-9">
          <div className="flex flex-row justify-end text-2xl font-bold">
            <span className="pr-4">{modalProps.modalSubtotalTitle}: </span>
            <span>
              {modalProps.modalCurrencySymbol}
              {total}
            </span>
          </div>
          <div className="flex w-full justify-end">{checkoutButton}</div>
        </div>
      )}
    </div>
  );
};

export default ShoppingCart;

import { FC, ReactNode, useCallback } from 'react';
import { Container } from '@uniformdev/csk-components/components/ui';
import { cn } from '@uniformdev/csk-components/utils/styling';
import { useCard } from '@/providers/CardProvider';
import ShoppingCartItem, { ShoppingCartItemSkeleton } from './ShoppingCartItem';

type ShoppingCartSkeletonProps = {
  itemsCount?: number;
};

const ShoppingCartSkeleton: FC<ShoppingCartSkeletonProps> = ({ itemsCount = 2 }) => (
  <Container className="md:pt-14 lg:mb-8">
    <div className="flex animate-pulse flex-col gap-4 text-black">
      <div className="hidden flex-row border-b pb-4 font-bold md:flex">
        <div className="basis-3/5">ITEM</div>
        <div className="basis-1/5">QTY</div>
        <div className="basis-1/5 text-right">PRICE</div>
      </div>

      {Array.from({ length: itemsCount }).map((_, idx) => (
        <ShoppingCartItemSkeleton key={idx} />
      ))}

      <div className="flex justify-end pt-6">
        <div className="h-6 w-40 rounded bg-gray-200"></div>
      </div>

      <div className="flex justify-end pt-4">
        <div className="h-10 w-48 rounded bg-gray-300"></div>
      </div>
    </div>
  </Container>
);

type ShoppingCartProps = {
  primaryTextColor?: string;
  secondaryTextColor?: string;
  emptyCartContent: ReactNode;
  checkoutButton: ReactNode;
};

const ShoppingCart: FC<ShoppingCartProps> = ({
  primaryTextColor,
  secondaryTextColor,
  emptyCartContent,
  checkoutButton,
}) => {
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

  const isNewItemsAddedToCard = isCartLoading && Object.keys(storedCart).length > cartProducts.length;

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
              />
            );
          })
        : emptyCartContent}
      {isNewItemsAddedToCard && <ShoppingCartItemSkeleton />}
      {hasItems && (
        <div className="flex flex-col gap-4 pt-9">
          <div className="flex flex-row justify-end text-2xl font-bold">
            <span className="pr-4">Subtotal: </span>
            <span>${total}</span>
          </div>
          <div className="flex w-full justify-end">{checkoutButton}</div>
        </div>
      )}
    </div>
  );
};

export default ShoppingCart;

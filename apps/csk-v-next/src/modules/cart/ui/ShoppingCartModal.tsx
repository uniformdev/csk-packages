import { FC, useEffect, useCallback, useRef } from 'react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import classNames from 'classnames';
import { Button } from '@uniformdev/csk-components/components/ui';
import CloseIcon from '@/components/custom-ui/CloseIcon';
import ModalLayout from '@/components/custom-ui/ModalLayout';
import { useLockScroll } from '@/hooks/useLockScroll';
import { ShoppingCartItem } from './ShoppingCartItem';
import { ShoppingMiniCartSkeleton } from './skeleton/ShoppingMiniCartSkeleton';
import { useCard } from '../providers/CardProvider';
import { ShoppingMiniCartItemSkeleton } from './skeleton/ShoppingMiniCartItemSkeleton';

type Styles = {
  container?: string;
};
type CartContentProps = {
  onCloseModal: () => void;
  styles?: Styles;
};

const CartContent: FC<CartContentProps> = ({ onCloseModal, styles }) => {
  const { cartProducts, isCartLoading, storedCart, total, updateCard, removeFromCard, isModalCartOpen } = useCard();

  const productsContainerRef = useRef<HTMLDivElement>(null);

  useLockScroll(isModalCartOpen);

  useEffect(() => {
    if (!isModalCartOpen) return;
    // scroll modal to the bottom
    productsContainerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, [isModalCartOpen]);

  useEffect(() => {
    // close modal on last product removed
    if (!cartProducts.length) onCloseModal();
  }, [onCloseModal, cartProducts.length]);

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
    return <ShoppingMiniCartSkeleton />;
  }

  return (
    <div className={classNames('flex relative h-full flex-col', styles?.container)}>
      <div className="fixed top-0 z-50 flex w-full items-center justify-between border-b bg-white px-4 py-2 sm:px-14 lg:py-0">
        <button className="group flex h-16 w-24 items-center" type="submit" onClick={onCloseModal}>
          <CloseIcon />
          <p className="pl-2 text-sm font-bold uppercase duration-300  group-hover:underline">Close</p>
        </button>

        <div className="flex items-center justify-around text-xl font-extrabold">
          <p className="mr-2 uppercase">My Cart</p>
          <div className="mr-4">{total}</div>
          <Image
            unoptimized
            alt="icon-cart"
            width={30}
            height={30}
            src="https://res.cloudinary.com/uniform-demos/image/upload/v1692282886/csk-icons/icon-cart_zzou3e_yovtho.svg"
          />
        </div>
      </div>

      <div ref={productsContainerRef} className="mt-16 box-border flex flex-col">
        <div>
          {cartProducts.map(item => {
            const productFromCart = storedCart[item.slug];

            if (!productFromCart) return <ShoppingMiniCartItemSkeleton key={item.slug} />;

            return (
              <div key={item?.slug} className="border-b p-4 sm:px-14">
                <ShoppingCartItem
                  updateItemQuantity={updateItemQuantity}
                  removeItemFromCart={removeItemFromCart}
                  product={item}
                  quantity={productFromCart?.quantity}
                  isInModal
                />
              </div>
            );
          })}
          {isNewItemsAddedToCard && <ShoppingMiniCartItemSkeleton />}
        </div>
        <div className="pr-4 pt-11 sm:pr-14">
          <div className="flex flex-row justify-end text-2xl font-bold">
            <span className="pr-4">Subtotal:</span>${total}
          </div>
          <div className="flex flex-row justify-end py-4">
            <Button className="bg-black px-10 py-4 text-white" size="medium" href="/cart/checkout">
              Checkout
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

const ShoppingCartModal: FC<{ styles?: Styles }> = ({ styles }) => {
  const { isModalCartOpen, setIsModalCartOpen } = useCard();
  const pathname = usePathname();

  const onCloseModal = useCallback((): void => setIsModalCartOpen(false), [setIsModalCartOpen]);

  useEffect(() => {
    setIsModalCartOpen(false);
  }, [pathname, setIsModalCartOpen]);

  return (
    <ModalLayout isOpen={isModalCartOpen} onCloseModal={onCloseModal}>
      <CartContent onCloseModal={onCloseModal} styles={styles} />
    </ModalLayout>
  );
};

export default ShoppingCartModal;

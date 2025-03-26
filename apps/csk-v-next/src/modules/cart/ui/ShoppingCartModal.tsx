import { FC, useEffect, useCallback, useRef } from 'react';
import Image from 'next/image';
import classNames from 'classnames';
import ModalLayout from '@/components/custom-ui/ModalLayout';
import { ShoppingCartItem } from './ShoppingCartItem';
import { useCard } from '../providers/CardProvider';

type Styles = {
  container?: string;
};
type CartContentProps = {
  onCloseModal: () => void;
  styles?: Styles;
};

const togglePageScroll = (isHiddenManual?: boolean): void => {
  const html = document.querySelector('html');
  if (!html) return;
  const isHidden = isHiddenManual ?? html.style.overflow === 'hidden';
  html.style.overflow = isHidden ? 'auto' : 'hidden';
};

const CartContent: FC<CartContentProps> = ({ onCloseModal, styles }) => {
  const { cartProducts, isCartLoading, storedCart, total, updateCard, removeFromCard, isModalCartOpen } = useCard();

  const hasItems = Boolean(cartProducts.length);

  const productsContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    togglePageScroll(!isModalCartOpen);
    if (!isModalCartOpen) return;
    // scroll modal to the bottom
    productsContainerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, [isModalCartOpen]);

  useEffect(() => {
    // close modal on last product removed
    if (!cartProducts.length) onCloseModal();
  }, [onCloseModal, cartProducts.length]);

  const showLoadingIndications = isCartLoading && !hasItems;

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

  return (
    <div className={classNames('flex relative h-full flex-col', styles?.container)}>
      <div className="fixed top-0 z-50 flex w-full items-center justify-between border-b bg-white px-4 py-2 sm:px-14 lg:py-0">
        <button className="group flex h-16 w-24 items-center" type="submit" onClick={onCloseModal}>
          <Image
            unoptimized
            width={16}
            height={16}
            alt="icon-cross"
            src="https://res.cloudinary.com/uniform-demos/image/upload/v1692282918/csk-icons/icon-cross-black_c9f098_sqlipa.svg"
            className="w-3 fill-black stroke-transparent duration-300 group-hover:stroke-black"
          />
          <p className="pl-2 text-sm font-bold uppercase duration-300  group-hover:underline">Close</p>
        </button>
        {!showLoadingIndications && (
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
        )}
      </div>
      {!showLoadingIndications ? (
        <div ref={productsContainerRef} className="mt-16 box-border flex flex-col">
          <div>
            {cartProducts.map(item => {
              const productFromCart = storedCart[item.slug];

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
          </div>
          <div className="pr-4 pt-11 sm:pr-14">
            <div className="flex flex-row justify-end text-2xl font-bold">
              <span className="pr-4">Subtotal</span>
              {total}
            </div>
            <div className="flex flex-row justify-end"></div>
          </div>
        </div>
      ) : (
        <div className="flex justify-center text-black md:pt-14 lg:mt-8">
          <span className={classNames('loading loading-spinner loading-lg', { hidden: !isCartLoading })}></span>
        </div>
      )}
    </div>
  );
};

const ShoppingCartModal: FC<{ styles?: Styles }> = ({ styles }) => {
  const { isModalCartOpen, setIsModalCartOpen } = useCard();

  const onCloseModal = useCallback((): void => setIsModalCartOpen(false), [setIsModalCartOpen]);

  return (
    <ModalLayout isOpen={isModalCartOpen} onCloseModal={onCloseModal}>
      <CartContent onCloseModal={onCloseModal} styles={styles} />
    </ModalLayout>
  );
};

export default ShoppingCartModal;

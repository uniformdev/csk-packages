import { FC, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import classNames from 'classnames';
import { Product } from '@/modules/cart/types';
import ProductQuantityItem from './ProductQuantityItem';

export type ShoppingCartItemProps = {
  product: Product;
  quantity: number;
  isInModal?: boolean;
  updateItemQuantity?: (productKey: string, newQuantity: number) => void;
  removeItemFromCart?: (productKey: string) => void;
  secondaryTextColor?: string;
};

export const ShoppingCartItem: FC<ShoppingCartItemProps> = ({
  product,
  quantity,
  isInModal = false,
  updateItemQuantity,
  removeItemFromCart,
  secondaryTextColor,
}) => {
  const { primaryImage, slug, name, variants } = product;

  const { price, currency } = variants?.[0] || {};

  const [productImage] = primaryImage;

  const increaseProductQuantity = useCallback(
    async (): Promise<void> => updateItemQuantity?.(slug, quantity + 1),
    [quantity, updateItemQuantity, slug]
  );

  const decreaseProductQuantity = useCallback(
    async (): Promise<void> => updateItemQuantity?.(slug, quantity - 1),
    [quantity, updateItemQuantity, slug]
  );

  const handleRemoveProductButtonClick = useCallback(() => {
    removeItemFromCart?.(slug);
  }, [slug, removeItemFromCart]);

  return (
    <div className={classNames('flex flex-col py-3', { 'md:flex-row border-b': !isInModal, 'py-2': isInModal })}>
      <div className="basis-3/5">
        <div className={classNames('font-bold block', { 'md:hidden': !isInModal })}>ITEM</div>
        <div className={classNames('flex flex-col py-4 ', { 'md:flex-row lg:py-3': !isInModal })}>
          <div className={classNames('flex justify-between flex-row', { 'md:block': !isInModal })}>
            <div
              className={classNames('border border-slate-300 flex-initial w-28 h-28 hover:shadow-inner duration-300', {
                'lg:w-44 lg:h-44': !isInModal,
              })}
            >
              <div className={classNames('relative m-2  w-24 h-24  cursor-pointer', { 'lg:w-40 lg:h-40': !isInModal })}>
                <Link href={`products/${slug}`}>
                  {Boolean(productImage) && <Image fill src={productImage.url} alt={productImage.title || ''} />}
                </Link>
              </div>
            </div>
            <button
              type="button"
              className={classNames('inline-flex items-center relative h-5 text-primary', { 'md:hidden': !isInModal })}
              onClick={handleRemoveProductButtonClick}
            >
              <Image
                width={16}
                height={16}
                unoptimized
                src="https://res.cloudinary.com/uniform-demos/image/upload/v1692282918/csk-icons/icon-cross-black_c9f098_sqlipa.svg"
                alt="icon-cross"
                className="w-4 fill-blue-500 stroke-transparent duration-300 hover:stroke-blue-500"
              />
            </button>
          </div>
          <div
            className={classNames('py-4 flex flex-col justify-between', {
              'md:px-10 md:py-0': !isInModal,
              'pb-0': isInModal,
            })}
          >
            <Link href={`products/${slug}`}>
              <div className={classNames('cursor-pointer group', { 'lg:pt-4': !isInModal })}>
                <div className={classNames('max-w-2xl', { 'lg:w-full': !isInModal })}>
                  <span className="text-xl font-bold duration-300 group-hover:underline lg:text-2xl">{name}</span>
                </div>
              </div>
            </Link>
            {Boolean(removeItemFromCart) && (
              <button
                type="button"
                className={classNames('items-center mt-8 relative group h-5 hidden', { 'md:inline-flex': !isInModal })}
                onClick={handleRemoveProductButtonClick}
              >
                <Image
                  width={16}
                  height={16}
                  unoptimized
                  src="https://res.cloudinary.com/uniform-demos/image/upload/v1692282950/csk-icons/icon-cross-blue_qyhkct_o7gzai.svg"
                  alt="icon-cross"
                  className="w-3  stroke-transparent duration-300 "
                />
                <span
                  className={classNames('pl-2 text-sm font-bold', {
                    [`text-${secondaryTextColor}`]: !!secondaryTextColor,
                  })}
                >
                  &nbsp;{'Remove'}
                </span>
              </button>
            )}
          </div>
        </div>
      </div>
      <div className={classNames('flex flex-row justify-between basis-2/5', { 'md:pt-12 md:pb-8': !isInModal })}>
        <div>
          <div className={classNames('font-bold block pb-2', { 'md:hidden': !isInModal })}>QTY</div>
          {Boolean(updateItemQuantity) ? (
            <ProductQuantityItem
              onClickIncrement={increaseProductQuantity}
              onClickDecrement={decreaseProductQuantity}
              quantity={quantity}
            />
          ) : (
            <span className="select-none font-bold">{quantity}</span>
          )}
        </div>
        <div>
          <div className={classNames('font-bold block pb-2', { 'md:hidden': !isInModal })}>Price</div>
          <div className="text-xl md:text-2xl">{`${currency} ${price}`}</div>
        </div>
      </div>
    </div>
  );
};

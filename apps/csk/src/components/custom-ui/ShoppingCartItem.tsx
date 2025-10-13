import { FC, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@uniformdev/csk-components/utils/styling';
import CloseIcon from '@/components/custom-ui/CloseIcon';
import ProductQuantityItem from '@/components/custom-ui/ProductQuantityItem';
import { Product } from '@/types';

type ShoppingCartItemSkeletonProps = {
  variant?: 'default' | 'mini';
};

export const ShoppingCartItemSkeleton: FC<ShoppingCartItemSkeletonProps> = ({ variant = 'default' }) => {
  if (variant === 'mini') {
    return (
      <div className="border-b p-4 sm:px-14">
        <div className="flex flex-col py-3">
          <div className="basis-3/5">
            <div className="mb-4 block h-5 w-16 rounded bg-gray-200 font-bold"></div>
            <div className="flex flex-col py-4">
              <div className="flex flex-row justify-between">
                <div className="size-28 flex-initial rounded border border-slate-300 bg-gray-200"></div>
                <div className="relative inline-flex size-5 items-center rounded-full bg-gray-200"></div>
              </div>
              <div className="flex flex-col justify-between py-4 pb-0">
                <div className="group cursor-pointer">
                  <div className="max-w-2xl">
                    <div className="h-6 w-3/4 rounded bg-gray-200"></div>
                  </div>
                </div>
                <div className="group relative mt-8 hidden h-5 items-center">
                  <div className="h-4 w-20 rounded bg-gray-200"></div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 flex basis-2/5 flex-row justify-between">
            <div>
              <div className="block pb-2 font-bold">QTY</div>
              <div className="flex h-[50px] w-44 flex-row justify-between border border-gray-100">
                <div className="h-full w-14 bg-gray-200"></div>
                <div className="flex w-full items-center justify-center border-x border-gray-100">
                  <div className="h-4 w-6 rounded bg-gray-200"></div>
                </div>
                <div className="h-full w-14 bg-gray-200"></div>
              </div>
            </div>
            <div>
              <div className="block pb-2 font-bold">Price</div>
              <div className="h-6 w-20 rounded bg-gray-200 text-xl md:text-2xl"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 border-b py-6 md:flex-row">
      {/* Image + Title */}
      <div className="flex basis-3/5 flex-col gap-4 md:flex-row">
        <div className="size-28 rounded bg-gray-200 lg:size-44"></div>
        <div className="flex flex-1 flex-col justify-between py-2 md:px-6">
          <div className="mb-2 h-6 w-3/4 rounded bg-gray-200"></div>
          <div className="h-4 w-1/2 rounded bg-gray-200"></div>
          <div className="mt-4 hidden items-center gap-2 md:inline-flex">
            <div className="size-4 rounded-full bg-gray-200"></div>
            <div className="h-4 w-20 rounded bg-gray-200"></div>
          </div>
        </div>
      </div>

      {/* Qty & Price */}
      <div className="mt-6 flex basis-2/5 items-center justify-between md:mt-0 md:pb-6 md:pt-8">
        {/* Quantity controls */}
        <div className="flex h-[50px] w-44 items-center justify-between rounded bg-gray-100">
          <div className="h-full w-12 bg-gray-300"></div>
          <div className="h-full w-16 bg-gray-200"></div>
          <div className="h-full w-12 bg-gray-300"></div>
        </div>

        {/* Price */}
        <div className="h-6 w-20 rounded bg-gray-200"></div>
      </div>
    </div>
  );
};

type ShoppingCartItemProps = {
  product: Product;
  quantity: number;
  variant?: 'default' | 'mini';
  updateItemQuantity?: (productKey: string, newQuantity: number) => void;
  removeItemFromCart?: (productKey: string) => void;
  secondaryTextColor?: string;
};

const ShoppingCartItem: FC<ShoppingCartItemProps> = ({
  product,
  quantity,
  variant = 'default',
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

  const formattedPrice = new Intl.NumberFormat('en-US', { style: 'currency', currency: currency || 'USD' }).format(
    price
  );

  return (
    <div
      className={cn('flex flex-col py-3', {
        'md:flex-row border-b': variant === 'default',
        'py-2': variant === 'mini',
      })}
    >
      <div className="basis-3/5">
        <div className={cn('font-bold block', { 'md:hidden': variant === 'default' })}>ITEM</div>
        <div className={cn('flex flex-col py-4 ', { 'md:flex-row lg:py-3': variant === 'default' })}>
          <div className={cn('flex justify-between flex-row', { 'md:block': variant === 'default' })}>
            <div
              className={cn('border border-slate-300 flex-initial w-28 h-28 hover:shadow-inner duration-300', {
                'lg:w-44 lg:h-44': variant === 'default',
              })}
            >
              <div
                className={cn('relative m-2  w-24 h-24  cursor-pointer', {
                  'lg:w-40 lg:h-40': variant === 'default',
                })}
              >
                <Link href={`products/${slug}`}>
                  {Boolean(productImage) && <Image fill src={productImage.url} alt={productImage.title || ''} />}
                </Link>
              </div>
            </div>
            <button
              type="button"
              className={cn('inline-flex items-center relative h-5 text-primary', {
                'md:hidden': variant === 'default',
              })}
              onClick={handleRemoveProductButtonClick}
            >
              <CloseIcon />
            </button>
          </div>
          <div
            className={cn('py-4 flex flex-col justify-between', {
              'md:px-10 md:py-0': variant === 'default',
              'pb-0': variant === 'mini',
            })}
          >
            <Link href={`products/${slug}`}>
              <div className={cn('cursor-pointer group', { 'lg:pt-4': variant === 'default' })}>
                <div className={cn('max-w-2xl', { 'lg:w-full': variant === 'default' })}>
                  <span className="text-xl font-bold duration-300 group-hover:underline lg:text-2xl">{name}</span>
                </div>
              </div>
            </Link>
            {Boolean(removeItemFromCart) && (
              <button
                type="button"
                className={cn('items-center mt-8 relative group h-5 hidden', {
                  'md:inline-flex': variant === 'default',
                })}
                onClick={handleRemoveProductButtonClick}
              >
                <CloseIcon className="fill-blue-500 stroke-blue-500" />
                <span
                  className={cn('pl-2 text-sm font-bold', {
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
      <div className={cn('flex flex-row justify-between basis-2/5', { 'md:pt-12 md:pb-8': variant === 'default' })}>
        <div>
          <div className={cn('font-bold block pb-2', { 'md:hidden': variant === 'default' })}>QTY</div>
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
          <div className={cn('font-bold block pb-2', { 'md:hidden': variant === 'default' })}>Price</div>
          <div className="text-xl md:text-2xl">{`${formattedPrice}`}</div>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCartItem;

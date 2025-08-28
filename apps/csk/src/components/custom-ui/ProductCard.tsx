import { FC, ReactElement } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Container, Flex, Text } from '@uniformdev/csk-components/components/ui';
import AddToFavorites from './AddToFavorites';

export const ProductCardSkeleton: FC = () => (
  <div className="relative animate-pulse border w-full border-gray-300 bg-white p-4">
    <div className="relative h-[392px] w-full rounded bg-gray-200">
      <div className="absolute right-0 top-0 flex items-center justify-center bg-white p-4">
        <div className="size-[1.5em]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 18"
            width="24"
            height="24"
            fill="gray"
            className="opacity-30"
          >
            <path d="M9.99731 17.931C9.36575 17.931 8.73418 17.6939 8.2712 17.1995L1.72358 10.5042C-0.592146 8.09347 -0.570673 4.19671 1.76552 1.8079C2.902 0.6458 4.43893 0 6.03931 0C7.51295 0 8.88134 0.538167 9.99731 1.50687C11.0919 0.538167 12.4817 0 13.9553 0C15.5762 0 17.0917 0.6458 18.2291 1.8079C20.5867 4.21867 20.5867 8.11543 18.2505 10.5262L18.2291 10.5481L11.7448 17.1994C11.2605 17.6728 10.6289 17.9309 9.99735 17.9309L9.99731 17.931ZM3.26064 9.12705L9.703 15.7146C9.8502 15.8652 10.124 15.8652 10.2712 15.7146L16.734 9.10531C16.734 9.08345 16.7554 9.08345 16.776 9.06243L16.7973 9.04056C18.3343 7.44793 18.3343 4.86482 16.776 3.2712C16.0177 2.49589 15.0079 2.06536 13.9554 2.06536C12.9029 2.06536 11.8921 2.49589 11.1348 3.24933L11.1135 3.27119C11.0921 3.29305 11.0921 3.29305 11.0715 3.31407L10.7344 3.67986C10.5452 3.87326 10.2714 4.00276 9.99753 4.00276C9.72368 4.00276 9.44984 3.89512 9.2607 3.70173L8.90299 3.33595C8.88161 3.31408 8.88161 3.31408 8.86105 3.29306C8.10283 2.51776 7.11355 2.10909 6.04049 2.10909C4.96649 2.10909 3.95667 2.53963 3.21993 3.31493C1.66241 4.90756 1.66241 7.49068 3.21993 9.0843L3.24131 9.10616C3.23966 9.0843 3.26105 9.10532 3.26105 9.12718L3.26064 9.12705Z" />
          </svg>
        </div>
      </div>
    </div>

    <div className="mt-4 flex flex-col gap-y-2">
      <div className="h-6 w-3/4 rounded bg-gray-200" />
      <div className="h-4 w-1/3 rounded bg-gray-200" />
    </div>
  </div>
);

type ProductCardProps = {
  image: string;
  title: ReactElement | string;
  price: number;
  currency: string;
  category?: string;
  slug: string;
  link: string;
  textColor?: string;
  addToFavoritesIcon?: string;
  removeFromFavoritesIcon?: string;
  rating?: number;
};

const ProductCard: FC<ProductCardProps> = ({
  image,
  title,
  price,
  currency,
  category,
  slug,
  link,
  textColor,
  addToFavoritesIcon,
  removeFromFavoritesIcon,
  rating,
}) => {
  const formattedPrice = new Intl.NumberFormat('en-US', { style: 'currency', currency: currency || 'USD' }).format(
    price
  );
  return (
    <Link href={link} className="group">
      <Container wrapperClassName="h-full" className="relative h-full overflow-hidden" fluidContent>
        <div className="relative border border-gray-300 bg-white p-4">
          <div className="relative aspect-square w-full overflow-hidden bg-[#e7e7e7]">
            {image && (
              <Image
                className="object-cover transition-all duration-150 group-hover:scale-105"
                src={image}
                alt={slug}
                fill
              />
            )}

            {addToFavoritesIcon && removeFromFavoritesIcon && (
              <div className="absolute right-0 top-0 flex  items-center justify-center bg-white p-4">
                <AddToFavorites productSlug={slug} addIcon={addToFavoritesIcon} removeIcon={removeFromFavoritesIcon} />
              </div>
            )}
          </div>
        </div>

        <div className="relative mt-4 flex flex-col gap-y-2">
          {rating && (
            <div className="flex items-center gap-x-2">
              <svg width={16} height={16} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M11.2827 3.45332C11.5131 2.98638 11.6284 2.75291 11.7848 2.67831C11.9209 2.61341 12.0791 2.61341 12.2152 2.67831C12.3717 2.75291 12.4869 2.98638 12.7174 3.45332L14.9041 7.88328C14.9721 8.02113 15.0061 8.09006 15.0558 8.14358C15.0999 8.19096 15.1527 8.22935 15.2113 8.25662C15.2776 8.28742 15.3536 8.29854 15.5057 8.32077L20.397 9.03571C20.9121 9.11099 21.1696 9.14863 21.2888 9.27444C21.3925 9.38389 21.4412 9.5343 21.4215 9.68377C21.3988 9.85558 21.2124 10.0372 20.8395 10.4004L17.3014 13.8464C17.1912 13.9538 17.136 14.0076 17.1004 14.0715C17.0689 14.128 17.0487 14.1902 17.0409 14.2545C17.0321 14.3271 17.0451 14.403 17.0711 14.5547L17.906 19.4221C17.994 19.9355 18.038 20.1922 17.9553 20.3445C17.8833 20.477 17.7554 20.57 17.6071 20.5975C17.4366 20.6291 17.2061 20.5078 16.7451 20.2654L12.3724 17.9658C12.2361 17.8942 12.168 17.8584 12.0962 17.8443C12.0327 17.8318 11.9673 17.8318 11.9038 17.8443C11.832 17.8584 11.7639 17.8942 11.6277 17.9658L7.25492 20.2654C6.79392 20.5078 6.56341 20.6291 6.39297 20.5975C6.24468 20.57 6.11672 20.477 6.04474 20.3445C5.962 20.1922 6.00603 19.9355 6.09407 19.4221L6.92889 14.5547C6.95491 14.403 6.96793 14.3271 6.95912 14.2545C6.95132 14.1902 6.93111 14.128 6.89961 14.0715C6.86402 14.0076 6.80888 13.9538 6.69859 13.8464L3.16056 10.4004C2.78766 10.0372 2.60121 9.85558 2.57853 9.68377C2.55879 9.5343 2.60755 9.38389 2.71125 9.27444C2.83044 9.14863 3.08797 9.11099 3.60304 9.03571L8.49431 8.32077C8.64642 8.29854 8.72248 8.28742 8.78872 8.25662C8.84736 8.22935 8.90016 8.19096 8.94419 8.14358C8.99391 8.09006 9.02793 8.02113 9.09597 7.88328L11.2827 3.45332Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              {/* if rating is integer, show it, otherwise show it to 1 decimal place */}
              <span className="text-sm">{Number.isInteger(rating) ? rating : Number(rating).toFixed(1)}</span>
            </div>
          )}
          <Flex fluidContent direction="col" gap="1">
            <Text weight="bold" size="2xl" color={textColor}>
              {title}
            </Text>
            {category ? <Text color={textColor}>{category}</Text> : null}
            <Text size="base" color={textColor}>
              {formattedPrice}
            </Text>
          </Flex>
        </div>
      </Container>
    </Link>
  );
};

export default ProductCard;

import { FC, ReactElement } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Container, Flex, Text } from '@uniformdev/csk-components/components/ui';
import { AddToFavorites } from '@/modules/favorites/ui/AddToFavorites';

export type ProductCardProps = {
  image: string;
  title: ReactElement | string;
  price: ReactElement | string;
  slug: string;
  link: string;
  textColor: string;
  addToFavoritesIcon?: string;
  removeFromFavoritesIcon?: string;
};

export const ProductCard: FC<ProductCardProps> = ({
  image,
  title,
  price,
  slug,
  link,
  textColor,
  addToFavoritesIcon,
  removeFromFavoritesIcon,
}) => {
  return (
    <Link href={link}>
      <Container wrapperClassName="h-full" className="relative h-full overflow-hidden">
        <div className="relative border border-gray-300 bg-white p-4">
          <div className="relative h-[392px] w-full ">
            <Image src={image} alt={slug} fill />
            {addToFavoritesIcon && removeFromFavoritesIcon && (
              <div className="absolute right-0 top-0 flex  items-center justify-center bg-white p-4">
                <AddToFavorites productSlug={slug} addIcon={addToFavoritesIcon} removeIcon={removeFromFavoritesIcon} />
              </div>
            )}
          </div>
        </div>

        <div className="relative mt-4 flex flex-col gap-y-2">
          <Flex fluidContent direction="col" gap="2">
            <Text weight="bold" size="2xl" color={textColor}>
              {title}
            </Text>
            <Text size="base" color={textColor}>
              {price}
            </Text>
          </Flex>
        </div>
      </Container>
    </Link>
  );
};

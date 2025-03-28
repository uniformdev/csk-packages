'use client';

import { FC } from 'react';
import classNames from 'classnames';
import { Asset } from '@uniformdev/assets';
import {
  NavigationLink as CSKNavigationLink,
  NavigationLinkProps as CSKNavigationLinkProps,
} from '@uniformdev/csk-components/components/canvas';
import { cn } from '@uniformdev/csk-components/utils/styling';
import { FavoritesIconSkeleton, useFavorites } from '@/modules/favorites';

type FavoritesIconProps = Omit<CSKNavigationLinkProps, 'icon'> & {
  emptyFavoritesIcon: Asset[];
  filledFavoritesIcon: Asset[];
};

const FavoritesIcon: FC<FavoritesIconProps> = ({ filledFavoritesIcon, emptyFavoritesIcon, ...props }) => {
  const { isFavoritesLoading, storedFavorites } = useFavorites();

  const hasItems = Boolean(Object.keys(storedFavorites).length);

  if (isFavoritesLoading && !hasItems) {
    return <FavoritesIconSkeleton />;
  }

  return (
    <div
      className={cn('relative size-[1em]', {
        [`text-${props.size}`]: !!props.size,
      })}
    >
      <div
        className={classNames('absolute inset-0 transition-opacity duration-300', {
          'opacity-0 pointer-events-none': hasItems,
          'opacity-100': !hasItems,
        })}
      >
        <CSKNavigationLink icon={emptyFavoritesIcon} {...props} />
      </div>

      <div
        className={classNames('absolute inset-0 transition-opacity duration-300', {
          'opacity-100': hasItems,
          'opacity-0 pointer-events-none': !hasItems,
        })}
      >
        <CSKNavigationLink icon={filledFavoritesIcon} {...props} />
      </div>
    </div>
  );
};

export default FavoritesIcon;

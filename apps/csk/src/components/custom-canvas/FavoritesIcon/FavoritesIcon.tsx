'use client';

import { FC } from 'react';
import classNames from 'classnames';

import { NavigationLink as CSKNavigationLink } from '@uniformdev/csk-components/components/canvas';
import { cn } from '@uniformdev/csk-components/utils/styling';
import { useFavorites } from '@/providers/FavoritesProvider';
import { FavoritesIconProps } from '.';
import { FavoritesIconSkeleton } from './skeleton';

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

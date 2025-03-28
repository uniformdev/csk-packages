'use client';

import { FC } from 'react';
import dynamic from 'next/dynamic';
import { Asset } from '@uniformdev/assets';
import { NavigationLinkProps as CSKNavigationLinkProps } from '@uniformdev/csk-components/components/canvas';
import { FavoritesIconSkeleton } from '@/modules/favorites';

const FavoritesIconClient = dynamic(() => import('./favorites-icon').then(mod => mod.default), {
  ssr: false,
  loading: () => <FavoritesIconSkeleton />,
});

type FavoritesIconProps = Omit<CSKNavigationLinkProps, 'icon'> & {
  emptyFavoritesIcon: Asset[];
  filledFavoritesIcon: Asset[];
};

const FavoritesIcon: FC<FavoritesIconProps> = props => <FavoritesIconClient {...props} />;

export default FavoritesIcon;

'use client';

import { FC } from 'react';
import dynamic from 'next/dynamic';
import { AssetParamValue } from '@uniformdev/assets';
import { NavigationLinkProps as CSKNavigationLinkProps } from '@uniformdev/csk-components/components/canvas';
import { FavoritesIconSkeleton } from './skeleton';

const FavoritesIconClient = dynamic(() => import('./FavoritesIcon').then(mod => mod.default), {
  ssr: false,
  loading: () => <FavoritesIconSkeleton />,
});

export type FavoritesIconProps = Omit<CSKNavigationLinkProps, 'icon'> & {
  emptyFavoritesIcon: AssetParamValue;
  filledFavoritesIcon: AssetParamValue;
};

const FavoritesIcon: FC<FavoritesIconProps> = props => <FavoritesIconClient {...props} />;

export default FavoritesIcon;
